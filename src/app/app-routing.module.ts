import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/authentication/auth.guard';
import { LoginComponent } from './core/authentication/login/login.component';
import { AddCouponComponent } from './modules/coupons/add-coupon/add-coupon.component';
import { AddUserComponent } from './modules/users/add-user/add-user.component';
import { AddserviceComponent } from './modules/orders/addservice/addservice.component';
import { AddvathiyarComponent } from './modules/vathiyars/addvathiyar/addvathiyar.component';
import { CouponsComponent } from './modules/coupons/coupons.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { OrdersComponent } from './modules/orders/orders.component';
import { ReportsComponent } from './modules/reports/reports.component';
import { ReviewsComponent } from './modules/reviews/reviews.component';
import { ServiceCardComponent } from './modules/service-card/service-card.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { UsersComponent } from './modules/users/users.component';
import { VathiyarsComponent } from './modules/vathiyars/vathiyars.component';
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



const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: '',   redirectTo: '/core/authentication/login/', pathMatch: 'full'}, 
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
  {path: 'vathiyars', component: VathiyarsComponent, canActivate: [AuthGuard]},
  {path: 'service-card', component: ServiceCardComponent, canActivate: [AuthGuard]},
  {path: 'reports', component: ReportsComponent, canActivate: [AuthGuard]},
  {path: 'reviews', component: ReviewsComponent, canActivate: [AuthGuard]},
  {path: 'coupons', component: CouponsComponent, canActivate: [AuthGuard]},
  {
    path: 'users', component: UsersComponent, canActivate: [AuthGuard]
    // children: [
    //         { path: 'adduser', component: AddUserComponent, canActivate: [AuthGuard] },
    //         { path: 'edit/:id', component: AddUserComponent, canActivate: [AuthGuard] }
    // ]
  },
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'addservice', component: AddserviceComponent, canActivate: [AuthGuard]},
  {path: 'addvathiyar', component: AddvathiyarComponent, canActivate: [AuthGuard]},
  {path: 'addcoupon', component: AddCouponComponent, canActivate: [AuthGuard]},
  {path: 'adduser', component: AddUserComponent, canActivate: [AuthGuard]},
  {path: 'service-category', component: ServiceCategoryComponent},
  {path: 'addservicecategory', component: AddservicecategoryComponent},
  {path: 'addvathiyar', component: AddservicecategoryComponent},
  {path: 'package', component: PackageComponent},
  {path: 'addpackage', component: AddpackageComponent},
  {path: 'inclusion', component: InclusionComponent},
  {path: 'addinclusion', component: AddinclusionComponent},
  {path: 'community', component: CommunityComponent},
  {path: 'addcommunity', component: AddcommunityComponent},
  {path: 'language', component: LanguageComponent},
  {path: 'addlanguage', component: AddlanguageComponent},
  {path: 'location', component: LocationComponent},
  {path: 'addlocation', component: AddlocationComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  }), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
