import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreAppsPageRoutingModule } from './more-apps-routing.module';

import { MoreAppsPage } from './more-apps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoreAppsPageRoutingModule
  ],
  declarations: [MoreAppsPage]
})
export class MoreAppsPageModule {}
