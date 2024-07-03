import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoleggioRoutingModule } from './noleggio-routing.module';
import { NoleggioComponent } from './noleggio.component';


@NgModule({
  declarations: [
    NoleggioComponent
  ],
  imports: [
    CommonModule,
    NoleggioRoutingModule
  ]
})
export class NoleggioModule { }
