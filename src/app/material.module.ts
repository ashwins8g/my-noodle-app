import { NgModule } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

const material = [ MatProgressSpinnerModule, MatButtonModule, MatCardModule, MatListModule ];

@NgModule({
  imports: [ material ],
  exports: [ material ]
})
export class MaterialModule {}
