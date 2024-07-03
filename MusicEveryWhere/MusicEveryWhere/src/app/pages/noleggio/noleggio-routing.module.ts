import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoleggioComponent } from './noleggio.component';

const routes: Routes = [{ path: '', component: NoleggioComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoleggioRoutingModule { }
