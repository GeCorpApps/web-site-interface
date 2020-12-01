import { BrowserModule, Meta } from '@angular/platform-browser';
import { LOCALE_ID, NgModule, TRANSLATIONS, TRANSLATIONS_FORMAT } from '@angular/core';
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
import { LayoutSideNavComponent } from './layout/side-nav/side-nav.component';
import { PageContactComponent } from './modules/pages/contact/contact.component';
import { PagePageComponent } from './modules/pages/page/page.component';
import { IndexPartnersComponent } from './modules/index/partners/partners.component';
import { PageServicesComponent } from './modules/pages/services/services.component';
import { ServiceComponent } from './modules/pages/service/service.component';
import { WindowRef } from './WindowRef';
import { MainSectionMainBannerComponent } from './layout/main-section/main-banner/main-banner.component';
import { ProductsSectionComponent } from './layout/main-section/products-section/products-section.component';
import { FeaturesSectionComponent } from './layout/main-section/features-section/features-section.component';
import { InventorySectionComponent } from './layout/main-section/inventory-section/inventory-section.component';
import { BlogSectionComponent } from './layout/main-section/blog-section/blog-section.component';
import { TestimonialsSectionComponent } from './layout/main-section/testimonials-section/testimonials-section.component';
import { ContactSectionComponent } from './layout/main-section/contact-section/contact-section.component';
import { getCurrentLocale, getTranslationProviders } from './i18n-providers';

var vLocale = getCurrentLocale();

@NgModule({
  declarations: [
    AppComponent,
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
    ServiceComponent,
    MainSectionMainBannerComponent,
    ProductsSectionComponent,
    FeaturesSectionComponent,
    InventorySectionComponent,
    BlogSectionComponent,
    TestimonialsSectionComponent,
    ContactSectionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    LayoutHeaderComponent,
    LayoutFooterComponent,
    LayoutSideNavComponent
  ],
  providers: [
    Meta,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    WindowRef,


    { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
    { provide: LOCALE_ID, useValue: vLocale }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  public language: any;
  public LocaleName: string;
  constructor(private winRef: WindowRef) {
    this.winRef.nativeWindow.document.locale=vLocale;
    this.LocaleName = vLocale;
  }
 }
