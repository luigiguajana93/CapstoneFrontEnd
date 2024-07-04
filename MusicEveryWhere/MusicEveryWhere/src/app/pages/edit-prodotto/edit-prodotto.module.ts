import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProdottoRoutingModule } from './edit-prodotto-routing.module';
import { EditProdottoComponent } from './edit-prodotto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: EditProdottoComponent }
];

@NgModule({
  declarations: [
    EditProdottoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditProdottoRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class EditProdottoModule { }
