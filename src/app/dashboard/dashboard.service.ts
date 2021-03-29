import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Restaurant } from './models';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { shareReplay, share, catchError } from 'rxjs/operators';

const fetchRandomImagesUrl = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/noodlesec253ad.json';
const fetchRestaurantDetailsUrl = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/TopRamen8d30951.json';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly _selectedRestaurant = new BehaviorSubject<Restaurant>({});
  readonly selectedRestaurant$ = this._selectedRestaurant.asObservable().pipe(share());

  constructor(private http: HttpClient) {}

  processData(ajax$: Observable<any>): Observable<any> {
    return ajax$.pipe(
      catchError((error) => {
        this.showErrorDialog(error);
        return of(error);
      })
    );
  }

  showErrorDialog(errorResponse: any) {
    errorResponse = typeof errorResponse === 'string' ? errorResponse : 'Something Went Wrong!';
    alert(errorResponse);
  }

  changeSelectedRestaurant(newValue: Restaurant) {
    this._selectedRestaurant.next(newValue);
  }

  getRandomImages(): Observable<any> {
    return this.processData(this.http.get(fetchRandomImagesUrl).pipe(shareReplay(1)));
  }

  getListOfRestaurants(): Observable<any> {
    return this.processData(this.http.get(fetchRestaurantDetailsUrl).pipe(shareReplay(1)));
  }
}
