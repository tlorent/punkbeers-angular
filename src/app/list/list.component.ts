import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Beer } from '../beer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  // https://stackoverflow.com/questions/49699067/property-has-no-initializer-and-is-not-definitely-assigned-in-the-construc
  // What's the best solution?
  @Input() beers!: Beer[] | Observable<Beer[]>;

  constructor() { }

  ngOnInit(): void {
  }
}
