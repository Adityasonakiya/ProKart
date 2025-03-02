import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { AdminviewproductComponent } from './components/adminviewproduct/adminviewproduct.component';
import { AdminviewreviewsComponent } from './components/adminviewreviews/adminviewreviews.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { MyorderComponent } from './components/myorder/myorder.component';
import { MyreviewComponent } from './components/myreview/myreview.component';
import { OrderplacedComponent } from './components/orderplaced/orderplaced.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ReviewComponent } from './components/review/review.component';
import { SignupComponent } from './components/signup/signup.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { UserviewproductComponent } from './components/userviewproduct/userviewproduct.component';
import { ErrorComponent } from './components/error/error.component';
import { AuthGuard } from './services/auth.guard';
import { MainhomeComponent } from './components/mainhome/mainhome.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home-page', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'home', component: MainhomeComponent},
  { path: 'adminnav', component: AdminnavComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'adminviewproduct', component: AdminviewproductComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'adminviewreviews', component: AdminviewreviewsComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard], data: { roles: ['user', 'admin'] } },
  { path: 'error', component: ErrorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'myorder', component: MyorderComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  { path: 'myreview', component: MyreviewComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  { path: 'orderplaced', component: OrderplacedComponent, canActivate: [AuthGuard], data: { roles: ['user', 'admin'] } },
  { path: 'product-create', component: ProductCreateComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'product-create/:id', component: ProductCreateComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'review/:id', component: ReviewComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  { path: 'signup', component: SignupComponent },
  { path: 'usernav', component: UsernavComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  { path: 'userviewproduct', component: UserviewproductComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
