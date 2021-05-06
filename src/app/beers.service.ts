import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Beer } from './beer';

// @Injectable informs Angular that "things" can be injected in the constructor function.
// In this case it's the HttpClient provider/module/service/dependency.
@Injectable({
  providedIn: 'root',
})
export class BeersService {
  private beerUrl = 'https://api.punkapi.com/v2/beers';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private faves: Beer[] = [];
  private namesReversed: boolean = false;

  favsChanged = new Subject<Beer[]>();
  namesReversedUpdated = new Subject<boolean>();

  // Inject the HttpClient in the service.
  // Define a private http property and identify it as an HttpClient injection site.
  constructor(private http: HttpClient) {}

  fetchBeers(url?: string): Observable<Beer[]> {
    // Observables can return multiple values over time, but an Observable of an HttpClient always emits a single value
    // and then completes without ever emitting another value.

    // By typing the response of http.get it will return it in the requested type.
    // Otherwise you have to convert the response from JSON yourself.
    return this.http.get<Beer[]>(url ?? this.beerUrl, this.httpOptions).pipe(
      map((beers) =>
        beers.map(({ id, image_url, name, tagline }) => ({
          id,
          image_url,
          name,
          tagline,
          fav: this.faves.findIndex((favBeer) => favBeer.id === id) > -1,
        }))
      )
    );
  }

  getBeer(id: number): Observable<Beer[]> {
    const url = `${this.beerUrl}/${id}`;
    return this.fetchBeers(url);
  }

  searchBeers(beerName: string): Observable<Beer[]> {
    if (!beerName.trim()) return of([]);
    const url = `${this.beerUrl}/?beer_name=${beerName}`;
    return this.fetchBeers(url);
  }

  getFaves() {
    return this.faves;
  }

  addFav(beer: Beer) {
    const alreadyFav = this.faves.find(
      ({ id, name }) => id === beer.id || name === beer.name
    );
    if (!alreadyFav) this.faves = [...this.faves, { ...beer, fav: true }];

    // faves is changed.
    // emit the latest copy to whoever subscribes to this subject.
    this.favsChanged.next(this.faves);
  }

  removeFav(beerId: number) {
    this.faves = this.faves.filter((beer) => beer.id !== beerId);

    // faves is changed.
    // emit the latest copy to whoever subscribes to this subject.
    this.favsChanged.next(this.faves);
  }

  addCustomFav(newBeer: Beer) {
    const id = Math.floor(Math.random() * 38190283910823 + 25);
    const beer = { ...newBeer, id, fav: true };
    this.addFav(beer);
  }

  handleNamesReversed() {
    this.namesReversed = !this.namesReversed;
    this.namesReversedUpdated.next(this.namesReversed);
  }
}
