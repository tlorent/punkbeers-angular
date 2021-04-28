import { Component } from '@angular/core';

type Nav = {
  link: string;
  name: string;
  exact?: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  nav: Nav[] = [
  {
    link: '/beers',
    name: 'Beers',
    exact: true
  },
  {
    link: '/search',
    name: 'Search'
  },
  {
    link: '/faves',
    name: 'Favourites'
  }]

}
