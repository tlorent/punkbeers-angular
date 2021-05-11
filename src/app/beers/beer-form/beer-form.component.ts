import { Component, EventEmitter, Output } from '@angular/core';
import { Beer } from '../../beer';
import { City } from '../../city';

@Component({
  selector: 'app-beer-form',
  templateUrl: './beer-form.component.html',
  styleUrls: ['./beer-form.component.scss'],
})
export class BeerFormComponent {
  // Alias for custom event.
  @Output('update') updateBeer: EventEmitter<Beer> = new EventEmitter<Beer>();

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
    // Can't submit the form if it's invalid, but still useful I guess.
    if (isValid) {
      this.updateBeer.emit(beer);
    }
  }
}
