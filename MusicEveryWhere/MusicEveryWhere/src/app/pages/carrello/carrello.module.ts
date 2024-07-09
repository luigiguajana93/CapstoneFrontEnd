import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarrelloRoutingModule } from './carrello-routing.module';
import { CarrelloComponent } from './carrello.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CarrelloComponent
  ],
  imports: [
    CommonModule,
    CarrelloRoutingModule,
    FormsModule
  ]
})
export class CarrelloModule { }
