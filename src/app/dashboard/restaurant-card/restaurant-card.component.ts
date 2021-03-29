import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './../dashboard.service';
import { Restaurant } from './../models';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: [ './restaurant-card.component.scss' ]
})
export class RestaurantCardComponent implements OnInit {
  @Input() restaurant: Restaurant = {};

  constructor(private router: Router, private dashboardService: DashboardService) {}

  ngOnInit(): void {}

  redirectToRestaurantDetailsPage() {
    this.dashboardService.changeSelectedRestaurant(this.restaurant);
    this.router.navigate([ `/home/${this.restaurant.id}` ]);
  }
}
