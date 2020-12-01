//import '@angular/common/locales/en-GB';
import { BrowserModule, Meta } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutHeaderComponent } from './layout/header/header.component';
import { LayoutFooterComponent } from './layout/footer/footer.component';
import { SeoComponent } from './modules/seo/seo.component';
import { StaticpagesComponent } from './modules/staticpages/staticpages.component';
import { IndexComponent } from './modules/index/index/index.component';
import { InternalservererrorComponent } from './modules/httpstatuses/internalservererror/internalservererror.component';
import { PagenotfoundComponent } from './modules/httpstatuses/pagenotfound/pagenotfound.component';
import { UnautorizedComponent } from './modules/httpstatuses/unautorized/unautorized.component';
import { BadrequestComponent } from './modules/httpstatuses/badrequest/badrequest.component';
import { LoaderInterceptor } from './datasource/services/loader/loader.interceptors';
import { LoaderComponent } from './layout/loader/loader.component';
import { BoolPipe } from './pipes/bool.pipe';
import { ProductListComponent } from './modules/product/list/list.component';
import { ProductItemComponent } from './modules/product/item/item.component';
import { ListingCategoriesComponent } from './modules/listing/categories/categories.component';
import { ListingManufacturersComponent } from './modules/listing/manufacturers/manufacturers.component';
import { ProductManufacturerComponent } from './modules/product/manufacturer/manufacturer.component';
import { LayoutPopupMobileManuComponent } from './layout/popup-mobile-manu/popup-mobile-manu.component';
import { LayoutSideNavComponent } from './layout/side-nav/side-nav.component';
import { PageContactComponent } from './modules/pages/contact/contact.component';
import { PagePageComponent } from './modules/pages/page/page.component';
import { IndexPartnersComponent } from './modules/index/partners/partners.component';
import { PageServicesComponent } from './modules/pages/services/services.component';
import { ServiceComponent } from './modules/pages/service/service.component';
import { WindowRef } from './WindowRef';

@NgModule({
  declarations: [
    AppComponent,
    LayoutPopupMobileManuComponent,
    IndexComponent,
    LayoutHeaderComponent,
    LayoutFooterComponent,
    SeoComponent,
    StaticpagesComponent,
    InternalservererrorComponent,
    PagenotfoundComponent,
    UnautorizedComponent,
    BadrequestComponent,
    LoaderComponent,
    BoolPipe,
    ProductListComponent,
    ProductItemComponent,
    ListingCategoriesComponent,
    ListingManufacturersComponent,
    ProductManufacturerComponent,
    LayoutSideNavComponent,
    PageContactComponent,
    PagePageComponent,
    IndexPartnersComponent,
    PageServicesComponent,
    ServiceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    VirtualScrollerModule
  ],
  exports: [
    LayoutHeaderComponent,
    LayoutFooterComponent,
    LayoutPopupMobileManuComponent,
    LayoutSideNavComponent
  ],
  providers: [
    Meta,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    WindowRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  public language: any;
  public LocaleName: string;
  constructor(private winRef: WindowRef) {
  
  winRef.nativeWindow.document.locale='ka';
  this.LocaleName = winRef.nativeWindow.document.locale
  console.log('[CONSTRUCTOR CALLED]', winRef.nativeWindow.document.locale);
  }
 }
