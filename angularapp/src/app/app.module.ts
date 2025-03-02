import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { AdminviewproductComponent } from './components/adminviewproduct/adminviewproduct.component';
import { AdminviewreviewsComponent } from './components/adminviewreviews/adminviewreviews.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ErrorComponent } from './components/error/error.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { UserStoreService } from './services/user-store.service';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainhomeComponent } from './components/mainhome/mainhome.component';
// import { AuthGuard } from './components/authguard/authguard.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminnavComponent,
    AdminviewproductComponent,
    AdminviewreviewsComponent,
    CheckoutComponent,
    ErrorComponent,
    HomePageComponent,
    LoginComponent,
    MyorderComponent,
    MyreviewComponent,
    OrderplacedComponent,
    ProductCreateComponent,
    ReviewComponent,
    SignupComponent,
    UsernavComponent,
    UserviewproductComponent,
    MainhomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing',
      easeTime: 300,
      newestOnTop: true
    }),
    ToastContainerModule
  ],
  providers: [
    UserStoreService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
