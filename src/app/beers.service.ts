import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { Beer } from './beer';

// https://angular.io/guide/http#requesting-a-typed-response
type BeerResponse = Record<string, Beer>;

// @Injectable informs Angular that other services can be injected in the constructor function.
// In this case it's the HttpClient provider/module/service/dependency.
@Injectable({
  providedIn: 'root',
})
export class BeersService {
  private beerUrl =
    'https://punk-beers-angular-default-rtdb.europe-west1.firebasedatabase.app';
  private beers: Beer[] = [];
  private faves: Beer[] = [];
  private namesReversed: boolean = false;

  errors = new Subject<string>();
  favsChanged = new Subject<Beer[]>();
  namesReversedUpdated = new Subject<boolean>();

  // Inject the HttpClient in the service.
  // Define a private http property and identify it as an HttpClient injection site.
  constructor(private http: HttpClient, private authService: AuthService) {}

  formatBeers(data: BeerResponse): Beer[] {
    return Object.entries(data).map(([key, { image_url, name, tagline }]) => ({
      id: key,
      image_url,
      name,
      tagline,
      fav:
        this.faves.length &&
        this.faves.findIndex((favBeer) => favBeer.id === key) > -1
          ? true
          : false,
    }));
  }

  fetchBeers(url?: string): Observable<Beer[]> {
    // Observables can return multiple values over time, but an Observable of an HttpClient always
    // emits a single value and then completes without ever emitting another value.

    // https://angular.io/guide/http#requesting-a-typed-response
    // Specifying the response type acts as a type assertion at compile time,
    // to make consuming the output easier and more obvious. Not a guarantee that the server
    // responds with an object of this type.
    return this.http
      .get<BeerResponse>(url ?? `${this.beerUrl}/beers.json`)
      .pipe(
        // TODO: Is this correct? Formatting the beers twice, is map necessary for one value,
        // is tap correct for this use case (setting the beers state based on the API data)?
        tap((beers) => (this.beers = this.formatBeers(beers))),
        // map returns a function that returns an Observable that emits the values from
        // the source Observable transformed by the project function (the first argument in the callback of map).
        // why use map here? because we need to return an array of Beer, not an object
        // which contains a key-value pair of beers.
        map((beers) => this.formatBeers(beers))
      );
  }

  getBeer(id: string) {
    return this.beers.find((beer) => beer.id === id);
  }

  // searchBeers(beerName: string) {
  //   if (!beerName.trim()) return of([]);
  //   const url = `${this.beerUrl}/?beer_name=${beerName}`;
  //   return this.fetchBeers(url);
  // }

  formatFaves(faves: BeerResponse) {
    return faves
      ? (this.faves = Object.values(faves).map((fav) => ({
          ...fav,
        })))
      : [];
  }

  getFaves() {
    return this.http.get<BeerResponse>(`${this.beerUrl}/faves.json`).pipe(
      // https://rxjs.dev/api/operators/tap
      // Use tap for side-effects (affect outside state) and debugging.

      // TODO: Is this correct? Formatting the beers twice, is map necessary for one value,
      // is tap correct for this use case (setting the faves state)?
      tap((faves) => (this.faves = this.formatFaves(faves))),
      map((faves) => this.formatFaves(faves)),
      catchError((errorRes) => {
        this.errors.next(errorRes);

        return throwError(errorRes);
      })
    );
  }

  addFav(beer: Beer) {
    const alreadyFav = this.faves.find(
      ({ id, name }) => id === beer.id || name === beer.name
    );

    if (!alreadyFav) {
      this.faves = [...this.faves, beer];
      this.http.post<Beer>(`${this.beerUrl}/faves.json`, beer).subscribe(
        () => {},
        (error) => {
          this.errors.next(error.message);
        }
      );
    }

    // faves is changed.
    // emit the latest copy to whoever subscribes to this subject.
    this.favsChanged.next(this.faves);
  }

  removeFav(beerId: string) {
    this.faves = this.faves.filter((beer) => beer.id !== beerId);

    this.http.delete(`${this.beerUrl}/faves/${beerId}.json`).subscribe();

    // faves is changed.
    // emit the latest copy to whoever subscribes to this subject.
    this.favsChanged.next(this.faves);
  }

  addCustomFav(newBeer: Beer) {
    const beer = { ...newBeer, fav: true };

    // Add to db in beers.
    this.http.post(`${this.beerUrl}/beers.json`, beer).subscribe(
      () => {},
      (error) => {
        this.errors.next(error.message);
      }
    );

    this.addFav(beer);
  }

  handleNamesReversed() {
    this.namesReversed = !this.namesReversed;
    this.namesReversedUpdated.next(this.namesReversed);
  }
}
