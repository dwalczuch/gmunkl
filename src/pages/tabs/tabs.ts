import { Component } from '@angular/core';

import { WuenschePage } from '../pages';
import { OrganisationenPage } from '../pages';
import { FavoritenPage } from '../pages';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = WuenschePage;
  tab2Root = OrganisationenPage;
  tab3Root = FavoritenPage;

  constructor() {

  }
}
