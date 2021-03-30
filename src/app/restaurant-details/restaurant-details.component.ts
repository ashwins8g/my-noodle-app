import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { DashboardService } from '../dashboard/dashboard.service';
import { Restaurant } from '../dashboard/models';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: [ './restaurant-details.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantDetailsComponent implements OnInit, OnDestroy {
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

  goBack() {
    this.dashboardService.changeSelectedRestaurant({});
    this.router.navigate([ '/home' ]);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
