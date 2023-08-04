import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { PostReviewComponent } from './post-review/post-review.component';
import { RaiseRequestComponent } from './raise-request/raise-request.component';
import { RegisterComponent } from './register/register.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:'',component:HomepageComponent},
  {path:'Login',component:LoginComponent},
  {path:'Register',component:RegisterComponent},
  {path:'Dashboard',component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'Dashboard/PostReview',component:PostReviewComponent, canActivate:[AuthGuard]},
  {path:'Dashboard/ProductReviews',component:ReviewPageComponent, canActivate:[AuthGuard]},
  {path:'AdminDashboard',component:AdminDashboardComponent, canActivate:[AuthGuard]},
  {path:'Dashboard/RaiseRequest',component:RaiseRequestComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
