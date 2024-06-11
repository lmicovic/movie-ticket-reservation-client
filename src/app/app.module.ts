import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';
import { BannerComponent } from './components/banner/banner.component';
import { HomeComponent } from './components/home/home.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { SigninComponent } from './components/signin/signin.component';
import { CardItemComponent } from './components/card-item/card-item.component';
import { MoviewPreviewComponent } from './components/card-item/moview-preview/moview-preview.component';
import { MoviewInformationComponent } from './components/moview-information/moview-information.component';
import { MovieDescriptionFormatPipe } from './pipes/movie-description-format/movie-description-format.pipe';
import { MovieScheduleTableComponent } from './components/movie-schedule-table/movie-schedule-table.component';
import { MovieCommentComponent } from './components/moview-information/movie-comment/movie-comment.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserCommentComponent } from './components/moview-information/movie-comment/user-comment/user-comment.component';
import { BuyTicketComponent } from './components/moview-information/buy-ticket/buy-ticket.component';
import { MovieService } from './services/movie/movie.service';
import { HttpClientModule } from '@angular/common/http';
import { ProjectionService } from './services/projection/projection.service';
import { CommentService } from './services/comment/comment.service';
import { UserService } from './services/user/user.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { StringListPipe } from './pipes/movie-description-format/string-list.pipe';
import { ReservationService } from './services/reservation/reservation.service';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserPreviewComponent } from './components/user-preview/user-preview.component';
import { UserDetailPanelComponent } from './components/user-detail-panel/user-detail-panel.component';
import { UserDetailContentComponent } from './components/user-detail-panel/user-detail-content/user-detail-content.component';
import { EmailValidators } from './validators/email.validators';
import { TestsComponent } from './other/tests/tests.component';
import { TestUserComponent } from './other/tests/test-user/test-user.component';
import { TestMovieComponent } from './other/tests/test-movie/test-movie.component';
import { TestProjectionComponent } from './other/tests/test-projection/test-projection.component';
import { RoomService } from './services/room/room.service';
import { TestRoomComponent } from './other/tests/test-room/test-room.component';
import { TestReservationComponent } from './other/tests/test-reservation/test-reservation.component';
import { AuthService } from './services/auth-service/auth-service.service';
import { TestAuthComponent } from './other/tests/test-auth/test-auth.component';
import { AuthGuardService } from './services/auth-guard-service/auth-guard.service';
import { LogoutComponent } from './components/logout/logout.component';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [

    // Component
    AppComponent,
    MenuComponent,
    BannerComponent,
    HomeComponent,
    UserRegisterComponent,
    SigninComponent,
    CardItemComponent,
    MoviewPreviewComponent,
    MoviewInformationComponent,
    MovieScheduleTableComponent,
    MovieCommentComponent,
    UserCommentComponent,
    BuyTicketComponent,
    UserCardComponent,
    UserPreviewComponent,
    UserDetailPanelComponent,
    UserDetailContentComponent,


    // Pipe
    MovieDescriptionFormatPipe,
    StringListPipe,
    TestsComponent,
    TestUserComponent,
    TestMovieComponent,
    TestProjectionComponent,
    TestRoomComponent,
    TestReservationComponent,
    TestAuthComponent,
    LogoutComponent,
    FooterComponent,

    
                  
                  
                      
                              
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      autoDismiss: true
    })          
  ],
  providers: [MovieService, ProjectionService, UserService, CommentService, ReservationService, RoomService, AuthService, AuthGuardService, EmailValidators],                // Service
  bootstrap: [AppComponent]
})
export class AppModule { }
