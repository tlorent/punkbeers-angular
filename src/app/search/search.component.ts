import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Beer } from '../beer';
import { BeersService } from '../beers.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  // why $? To indicate that it's an Observable, not an array.

  beers$: Observable<Beer[]> = new Observable<Beer[]>();

  /*
    Why a Subject? It's a source of observable values and an Observable itself.
    With the .next() method you can push values into the Observable, i.e. new values.
    The searchTerms has to be emitting a steady stream of search terms because we are
    dynamically searching for a beer. So if you type t and then ti and then tig, it
    will push these values to the Observable and each value will trigger a request
    to the API to gather beers that have the values of the searchTerms in their name.
   */
  private searchTerms$ = new Subject<string>();

  // Push a search term into the observable stream.
  handleChange(term: string) {
    this.searchTerms$.next(term);
  }

  constructor(private beerService: BeersService) {}

  // ngOnInit(): void {
  //   this.beers$ = this.searchTerms$.pipe(
  //     // wait 300ms after the using has typed, otherwise we fire API requests off like crazy.
  //     debounceTime(300),
  //     // only continue with the current value in the searchTerms stream
  //     // if it is different than the previous value in the stream.
  //     distinctUntilChanged(),

  //     // switch to new search observable each time the term changes
  //     // switchMap cancels and discards previous search observables and returns only the latest search service observable.
  //     // if an updated value comes through while the request is still active, cancel previous requests.
  //     switchMap((term: string) => this.beerService.searchBeers(term))
  //   );
  // }
}
