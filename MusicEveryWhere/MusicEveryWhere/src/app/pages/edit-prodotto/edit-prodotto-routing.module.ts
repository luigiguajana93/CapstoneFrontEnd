import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProdottoComponent } from './edit-prodotto.component';

const routes: Routes = [{ path: '', component: EditProdottoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditProdottoRoutingModule { }
