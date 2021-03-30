import { DashboardService } from './dashboard.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Restaurant } from './models';
import { Subscription } from 'rxjs';
import { List } from 'immutable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  listOfRandomImages: List<string> = List([]);
  listOfRestaurants: List<Restaurant> = List([]);

  private subscriptions: Subscription = new Subscription();

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getRandomImages();
  }

  getRandomImages(): void {
    this.subscriptions.add(
      this.dashboardService.getRandomImages().subscribe((res) => {
        if (res && Array.isArray(res) && res.length) {
          this.listOfRandomImages = List(res.map((item) => item.Image));
        }

        this.getListOfRestaurants();
      })
    );
  }

  getListOfRestaurants(): void {
    this.subscriptions.add(
      this.dashboardService.getListOfRestaurants().subscribe((res: Restaurant[]) => {
        if (res && Array.isArray(res) && res.length) {
          for (const [ index, item ] of res.entries()) {
            if (item && Object.keys(item).length && item.constructor === Object) {
              item.id = index + 1;
              item.imageUrl = this.listOfRandomImages.toArray()[this.generateRandomIndex()];
            }
          }

          this.listOfRestaurants = List(res);
        }
      })
    );
  }

  generateRandomIndex(): number {
    return Math.floor(Math.random() * this.listOfRandomImages.size);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
