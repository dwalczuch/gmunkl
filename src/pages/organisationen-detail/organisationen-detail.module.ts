import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrganisationenDetailPage } from './organisationen-detail';

@NgModule({
  declarations: [
    OrganisationenDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(OrganisationenDetailPage),
  ],
})
export class OrganisationenDetailPageModule {}
