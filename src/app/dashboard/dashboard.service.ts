import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { shareReplay, catchError } from 'rxjs/operators';
import * as randomImagesListObj from './../image-list.db.json';

// const fetchRandomImagesUrl = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/noodlesec253ad.json';
const fetchRestaurantDetailsUrl = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/TopRamen8d30951.json';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private randomImagesList: any = randomImagesListObj;

  constructor(private http: HttpClient) {}

  processData(ajax$: Observable<any>): Observable<any> {
    return ajax$.pipe(
      catchError((error) => {
        this.showErrorDialog(error);
        return of(error);
      })
    );
  }

  showErrorDialog(errorResponse: any): void {
    errorResponse = typeof errorResponse === 'string' ? errorResponse : 'Something Went Wrong!';
    alert(errorResponse);
  }

  getRandomImages(): Observable<any> {
    if (this.randomImagesList && this.randomImagesList.default) {
      return of(this.randomImagesList.default).pipe(shareReplay({ bufferSize: 1, refCount: true }));
    }

    return of([]);
  }

  getListOfRestaurants(): Observable<any> {
    return this.processData(
      this.http.get(fetchRestaurantDetailsUrl).pipe(shareReplay({ bufferSize: 1, refCount: true }))
    );
  }
}
