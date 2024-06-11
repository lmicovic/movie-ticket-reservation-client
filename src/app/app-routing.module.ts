import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SigninComponent } from './components/signin/signin.component';
import { CardItemComponent } from './components/card-item/card-item.component';
import { MoviewInformationComponent } from './components/moview-information/moview-information.component';
import { BuyTicketComponent } from './components/moview-information/buy-ticket/buy-ticket.component';
import { UserPreviewComponent } from './components/user-preview/user-preview.component';
import { AuthGuardService } from './services/auth-guard-service/auth-guard.service';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "register", component: UserRegisterComponent },
  { path: "login", component: SigninComponent },
  { path: "logout", component: LogoutComponent, canActivate: [AuthGuardService] },
  { path: "movie/:movieId", component: MoviewInformationComponent}, 
  { path: "resrvation/buy-ticket/:movieId", component: BuyTicketComponent, canActivate: [AuthGuardService]},
  { path: "register", component: UserPreviewComponent },
  { path: "user/preview/:userId", component: UserPreviewComponent, canActivate: [AuthGuardService] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  form = new FormGroup({

    email: new FormControl("", [Validators.required, ])

  });

}
