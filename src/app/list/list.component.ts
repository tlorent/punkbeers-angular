import { Component, Input } from '@angular/core';
import { Beer } from '../beer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() beers: Beer[] = [];
}
