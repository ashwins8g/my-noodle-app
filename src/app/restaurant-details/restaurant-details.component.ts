import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { DashboardService } from '../dashboard/dashboard.service';
import { Restaurant } from '../dashboard/models';
import { starImage } from './../dashboard/constants.model';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: [ './restaurant-details.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantDetailsComponent implements OnInit, OnDestroy {
  starImageUrl = starImage;
  restaurant: Restaurant = {};
  private subscriptions: Subscription = new Subscription();

  constructor(private dashboardService: DashboardService, private router: Router) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.dashboardService.selectedRestaurant$.pipe(distinctUntilChanged()).subscribe((selectedRestaurant) => {
        this.restaurant = selectedRestaurant;
      })
    );
  }

  goBack(): void {
    this.dashboardService.changeSelectedRestaurant({});
    this.router.navigate([ '/home' ]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
