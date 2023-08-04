import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component'
import { LoginapiService } from './services/loginapi.service';
import { AuthGuard } from './services/auth.guard';
import { ApiService } from './services/api.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { DataService } from './services/data.service';
import { Product } from './models/product';
import { PostReviewComponent } from './post-review/post-review.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RaiseRequestComponent } from './raise-request/raise-request.component';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    PostReviewComponent,
    ReviewPageComponent,
    AdminDashboardComponent,
    RaiseRequestComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
  
    HttpClientModule
  ],
  providers: [ [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],LoginapiService, AuthGuard, ApiService, DataService, Product],
  bootstrap: [AppComponent]
})
export class AppModule { }
