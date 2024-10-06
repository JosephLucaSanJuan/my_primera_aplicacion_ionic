import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCheerleaderPage } from './edit-cheerleader.page';

const routes: Routes = [
  {
    path:':id/:tid',
    component: EditCheerleaderPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCheerleaderPageRoutingModule {}
