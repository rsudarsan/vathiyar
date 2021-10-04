import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
// import _, { map } from 'underscore';

// Ng-Http-Loader 
import { NgHttpLoaderModule } from 'ng-http-loader';

// Multiselect dropdown module
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// Translate packages are imported for multilingual support
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

// services
import { WorkspaceService } from './services/workspace.service';
import { HttpGlobalService } from './services/httpglobal.service';
import { ValuesService } from './services/values.service';

import { TokenInterceptorService } from './core/authentication/token-interceptor.service';

// Authguard
import { AuthGuard } from './core/authentication/auth.guard';

// Components
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { LoginComponent } from './core/authentication/login/login.component';
import { OrdersComponent } from './modules/orders/orders.component';
import { ReviewsComponent } from './modules/reviews/reviews.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { VathiyarsComponent } from './modules/vathiyars/vathiyars.component';
import { AddserviceComponent } from './modules/orders/addservice/addservice.component';
import { AddvathiyarComponent } from './modules/vathiyars/addvathiyar/addvathiyar.component';
import { CouponsComponent } from './modules/coupons/coupons.component';
import { AddCouponComponent } from './modules/coupons/add-coupon/add-coupon.component';
import { AddUserComponent } from './modules/users/add-user/add-user.component';
import { UsersComponent } from './modules/users/users.component';
import { ServiceCardComponent } from './modules/service-card/service-card.component';
import { ReportsComponent } from './modules/reports/reports.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { HomeComponent } from './home/home.component';
import { TabContentComponent } from './modules/service-card/tab-content/tab-content.component';
// import { PopupComponent } from './shared/components/popup/popup.component';
import { ServiceCategoryComponent } from './modules/service-category/service-category.component';
import { AddservicecategoryComponent } from './modules/service-category/addservicecategory/addservicecategory.component';
import { PackageComponent } from './modules/package/package.component';
import { AddpackageComponent } from './modules/package/addpackage/addpackage.component';
import { InclusionComponent } from './modules/inclusion/inclusion.component';
import { AddinclusionComponent } from './modules/inclusion/addinclusion/addinclusion.component';
import { CommunityComponent } from './modules/community/community.component';
import { AddcommunityComponent } from './modules/community/addcommunity/addcommunity.component';
import { LanguageComponent } from './modules/language/language.component';
import { AddlanguageComponent } from './modules/language/addlanguage/addlanguage.component';
import { LocationComponent } from './modules/location/location.component';
import { AddlocationComponent } from './modules/location/addlocation/addlocation.component';

// Pipes import
import { OrderByPipe } from './shared/pipes/order-by.pipe';

import { NgSelectModule } from '@ng-select/ng-select';

import { MyModalComponent } from './shared/components/my-modal.component';
import { ModalServiceModule } from './modal-service/modal-service.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    OrdersComponent,
    ReviewsComponent,
    DashboardComponent,
    VathiyarsComponent,
    AddserviceComponent,
    AddvathiyarComponent,
    CouponsComponent,
    AddCouponComponent,
    AddUserComponent,
    UsersComponent,
    ServiceCardComponent,
    ReportsComponent,
    SettingsComponent,
    HomeComponent,
    TabContentComponent,
    // PopupComponent,
    ServiceCategoryComponent,
    AddservicecategoryComponent,
    PackageComponent,
    AddpackageComponent,
    InclusionComponent,
    AddinclusionComponent,
    CommunityComponent,
    AddcommunityComponent,
    LanguageComponent,
    AddlanguageComponent,
    LocationComponent,
    AddlocationComponent,
    OrderByPipe,
    MyModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    NgbModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    NgSelectModule,
    BrowserAnimationsModule,
	  ToastrModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    ModalServiceModule.forRoot()
  ],
  providers: [WorkspaceService, AuthGuard, HttpGlobalService, ValuesService, 
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  entryComponents: [MyModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }


// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}