import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Restaurant } from './../models';
import { starImage } from './../constants.model';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: [ './restaurant-card.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantCardComponent {
  starImageUrl = starImage;

  @Input() restaurant: Restaurant = {};

  constructor() {}
}
