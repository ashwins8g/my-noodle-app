import { DashboardService } from './dashboard.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Restaurant } from './models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  listOfRandomImages: string[] = [];
  listOfRestaurants: Restaurant[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getRandomImages();
  }

  getRandomImages() {
    this.subscriptions.add(
      this.dashboardService.getRandomImages().subscribe((res) => {
        if (res && Array.isArray(res) && res.length) {
          this.listOfRandomImages = res.map((item) => item.Image);
        }

        this.getListOfRestaurants();
      })
    );
  }

  getListOfRestaurants() {
    this.subscriptions.add(
      this.dashboardService.getListOfRestaurants().subscribe((res: Restaurant[]) => {
        if (res && Array.isArray(res) && res.length) {
          for (const [ index, item ] of res.entries()) {
            if (item && Object.keys(item).length && item.constructor === Object) {
              item.id = index;
              item.imageUrl = this.listOfRandomImages[Math.floor(Math.random() * this.listOfRandomImages.length)];
            }
          }

          this.listOfRestaurants = res;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
