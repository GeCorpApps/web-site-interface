import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaticpagesComponent } from './modules/staticpages/staticpages.component';
import { IndexComponent } from './modules/index/index/index.component';
import { PagenotfoundComponent } from './modules/httpstatuses/pagenotfound/pagenotfound.component';
import { PageContactComponent } from './modules/pages/contact/contact.component';
import { PagePageComponent } from './modules/pages/page/page.component';
import { PageServicesComponent } from './modules/pages/services/services.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'page/:id',
    component: StaticpagesComponent
  },
  {
    path: 'contact',
    component: PageContactComponent,
    data: {
      id: 2
    }
  },
  {
    path: 'about',
    component: PagePageComponent,
    data: {
      id: 1
    }
  },
  {
    path: 'services',
    component: PageServicesComponent
  }, 
  {
    path: 'map',
    component: StaticpagesComponent
  },
  {
    path: '**',
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
