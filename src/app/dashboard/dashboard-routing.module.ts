import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RestaurantCardComponent } from './restaurant-card/restaurant-card.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: ':id', component: RestaurantCardComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class DashboardRoutingModule {}
