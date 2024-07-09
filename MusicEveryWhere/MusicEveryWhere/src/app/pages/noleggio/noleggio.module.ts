import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoleggioRoutingModule } from './noleggio-routing.module';
import { NoleggioComponent } from './noleggio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NoleggioComponent
  ],
  imports: [
    CommonModule,
    NoleggioRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NoleggioModule { }
