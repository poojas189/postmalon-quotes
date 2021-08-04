import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoreAppsPage } from './more-apps.page';

const routes: Routes = [
  {
    path: '',
    component: MoreAppsPage,
    data: {
      title: "More Apps"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreAppsPageRoutingModule {}
