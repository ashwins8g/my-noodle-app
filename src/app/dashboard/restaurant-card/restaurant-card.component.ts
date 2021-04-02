import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './../dashboard.service';
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

  constructor(private router: Router, private dashboardService: DashboardService) {}

  redirectToRestaurantDetailsPage(): void {
    this.dashboardService.changeSelectedRestaurant(this.restaurant);
    this.router.navigate([ `/home/${this.restaurant.id}` ]);
  }
}
