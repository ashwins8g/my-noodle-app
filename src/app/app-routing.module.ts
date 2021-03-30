import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';

// components
import { NotFoundComponent } from './not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'dashboard', redirectTo: 'home' },
  { path: 'home', loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule) },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'legacy',
      initialNavigation: 'enabled',
      preloadingStrategy: QuicklinkStrategy
    })
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
