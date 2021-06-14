import { Component, EventEmitter, Output } from '@angular/core';
import { Beer } from '../../beer';
import { City } from '../../city';

@Component({
  selector: 'app-beer-form',
  templateUrl: './beer-form.component.html',
  styleUrls: ['./beer-form.component.scss'],
})
export class BeerFormComponent {
  // https://angular.io/guide/styleguide#avoid-aliasing-inputs-and-outputs
  @Output() updateBeer: EventEmitter<Beer> = new EventEmitter<Beer>();
  defaultCity = 'ams';

  cities: City[] = [
    {
      key: 'ams',
      value: 'Amsterdam',
    },
    {
      key: 'tko',
      value: 'Tokyo',
    },
    {
      key: 'mlb',
      value: 'Melbourne',
    },
  ];

  toggleDrunk(gotDrunkFromBeer: boolean) {
    if (gotDrunkFromBeer) {
      this.changeBackground([
        'cyan',
        'aliceblue',
        'magenta',
        'cornflowerblue',
        'burlywood',
        'goldenrod',
        'magenta',
        'honeydew',
        'lightcoral',
        'magenta',
        'violet',
      ]);
    }
  }

  changeBackground(colors: string[]) {
    let count = 0;

    // Type assertion, not the best way but we're selecting the body.
    let element = document.querySelector('body') as HTMLBodyElement;
    const change = setInterval(() => {
      if (count >= 10) {
        element.style.backgroundColor = '#fff';
        clearInterval(change);
      } else {
        const selectedColor = colors[Math.floor(Math.random() * colors.length)];
        element.style.backgroundColor = selectedColor;
      }
      count++;
    }, 250);
  }

  handleSubmit(beer: Beer, isValid: boolean) {
    if (isValid) {
      this.updateBeer.emit(beer);
    }
  }
}
