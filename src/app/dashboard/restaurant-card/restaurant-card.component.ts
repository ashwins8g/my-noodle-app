import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from './../models';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: [ './restaurant-card.component.scss' ]
})
export class RestaurantCardComponent implements OnInit {
  @Input() restaurant: Restaurant = {};

  constructor(private router: Router) {}

  ngOnInit(): void {}

  redirectToRestaurantDetailsPage() {
    this.router.navigate([ `${this.restaurant.id}` ]);
  }
}
