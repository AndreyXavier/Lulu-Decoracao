import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabcadastroPage } from './tabcadastro.page';

const routes: Routes = [
  {
    path: '',
    component: TabcadastroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabcadastroPageRoutingModule {}
