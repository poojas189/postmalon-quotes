import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbackPage } from './feedback.page';

const routes: Routes = [
  {
    path: '',
    component: FeedbackPage,
    data: {
      title: "Feedback"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackPageRoutingModule {}
