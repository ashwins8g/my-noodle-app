import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { MaterialModule } from './../material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

// components
import { DashboardComponent } from './dashboard.component';
import { RestaurantCardComponent } from './restaurant-card/restaurant-card.component';

// services
import { DashboardService } from './dashboard.service';

const components = [ DashboardComponent, RestaurantCardComponent ];

const modules = [ CommonModule, DashboardRoutingModule, MaterialModule ];

const services = [ DashboardService ];

@NgModule({
  declarations: [ ...components ],
  imports: [ ...modules ],
  providers: [ ...services ]
})
export class DashboardModule {}
