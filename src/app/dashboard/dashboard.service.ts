import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';
import { shareReplay, catchError } from 'rxjs/operators';

const fetchRandomImagesUrl = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/noodlesec253ad.json';
const fetchRestaurantDetailsUrl = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/TopRamen8d30951.json';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
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

  getRandomImages(): Observable<any> {
    return this.processData(this.http.get(fetchRandomImagesUrl).pipe(shareReplay(1)));
  }

  getListOfRestaurants(): Observable<any> {
    return this.processData(this.http.get(fetchRestaurantDetailsUrl).pipe(shareReplay(1)));
  }
}
