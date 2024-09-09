import { HomeComponent } from './components/user-tools/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from './components/user-tools/user-register/user-register.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SigninComponent } from './components/user-tools/signin/signin.component';
import { MoviewInformationComponent } from './components/user-tools/moview-information/moview-information.component';
import { BuyTicketComponent } from './components/user-tools/moview-information/buy-ticket/buy-ticket.component';
import { UserPreviewComponent } from './components/user-tools/user-preview/user-preview.component';
import { AuthGuardService } from './services/auth-guard-service/auth-guard.service';
import { LogoutComponent } from './components/user-tools/logout/logout.component';
import { UserToolsComponent } from './components/user-tools/user-tools/user-tools.component';
import { AdministratorComponent } from './components/administrative-tools/administrator/administrator.component';
import { AdministratorMoviesComponent } from './components/administrative-tools/administrator-movies/administrator-movies.component';
import { AdministratorProjectionsComponent } from './components/administrative-tools/administrator-projections/administrator-projections.component';
import { AdministratorReservationsComponent } from './components/administrative-tools/administrator-reservations/administrator-reservations.component';
import { AdministratorRoomsComponent } from './components/administrative-tools/administrator-rooms/administrator-rooms.component';
import { AdministratorUsersComponent } from './components/administrative-tools/administrator-users/administrator-users.component';
import { AdministratorSettingsComponent } from './components/administrative-tools/administrator-settings/administrator-settings.component';






const routes: Routes = [

  { path: "application", component: UserToolsComponent, children: [

      { path: "home", component: HomeComponent },
      { path: "register", component: UserRegisterComponent },
      { path: "login", component: SigninComponent },
      { path: "logout", component: LogoutComponent, canActivate: [AuthGuardService] },
      { path: "movie/:movieId", component: MoviewInformationComponent}, 
      { path: "resrvation/buy-ticket/:movieId", component: BuyTicketComponent, canActivate: [AuthGuardService]},
      { path: "register", component: UserPreviewComponent },
      { path: "user/preview/:userId", component: UserPreviewComponent, canActivate: [AuthGuardService] },

  ]},
  { path: "admin", component: AdministratorComponent, children: [
    
    { path: "movies", component: AdministratorMoviesComponent },
    { path: "projections", component: AdministratorProjectionsComponent },
    { path: "reservations", component: AdministratorReservationsComponent },
    { path: "rooms", component: AdministratorRoomsComponent },
    { path: "users", component: AdministratorUsersComponent },
    { path: "settings", component: AdministratorSettingsComponent },
    

  ] }

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],      // scrollPositionRestoration: 'top' - when routerLink() is used to navigate page every page will be restored with Scroll Position looking at Top.
  exports: [RouterModule]
})
export class AppRoutingModule {

  form = new FormGroup({

    email: new FormControl("", [Validators.required, ])

  });

}
