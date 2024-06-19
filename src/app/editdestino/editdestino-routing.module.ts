import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditdestinoPage } from './editdestino.page';

const routes: Routes = [
  {
    path: '',
    component: EditdestinoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditdestinoPageRoutingModule {}
