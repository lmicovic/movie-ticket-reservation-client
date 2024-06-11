import { UserInfo } from './../../other/models/user/userInfo.class';
import { Component } from '@angular/core';
import { AbstractControl, EmailValidator, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { PasswordValidators } from '../../validators/password.validators';
import { User } from '../../other/models/user/user.class';
import { UserService } from '../../services/user/user.service';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { UserDTO } from '../../other/models/user/userDTO.interface';
import { UserInfoDTO } from '../../other/models/user/userInfoDTO.interface';
import { AuthRequestDTO } from '../../other/models/auth-request/authRequest.interface';
import { AuthService } from '../../services/auth-service/auth-service.service';
import { JwtTokenDTO } from '../../other/models/jwtToken/jwtTokenDTO.interface';
import { AuthRequest } from '../../other/models/auth-request/authRequest.class';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {

  showPassword: boolean = false;
  showPasswordConfirmation: boolean = false;

  form = new FormGroup({
    
    firstname: new FormControl("", [Validators.required]),
    lastname: new FormControl("", [Validators.required]),
    email: new FormControl("myname@domain.com", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")], [this.checkEmail.bind(this)]),
    password: new FormControl("Test!123!", [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]),
    passwordConfirm: new FormControl("Test!123!", [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}"), PasswordValidators.passwordMatch])

  });

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
    
  }

  onShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onShowPasswordConfirmation() {
    this.showPasswordConfirmation = !this.showPasswordConfirmation;
  }

  onSubmit(form: FormGroup) {

    // Ovde se nalazi JSON koji treba da saljemo na Server
    let json = form.value;

    // console.log(form.value);

    let userInfo: UserInfoDTO = new UserInfo(-1, form.value["firstname"], form.value["lastname"], form.value["email"], form.value["password"], "ROLE_USER");
    let user: UserDTO = new User(-1, undefined, userInfo, [], [], []);
    
    // console.log(user);
    
    
    this.userService.save(user).subscribe((savedUser: UserDTO) => {

      console.log(savedUser);
      
      let email = form.value["email"];
      let password = form.value["password"];
      
      let authRequest: AuthRequestDTO = new AuthRequest(email, password);

      this.login(authRequest);
      
      


    }, (error: Response) => {

      // HTTP Error - BAD_REQUEST - 400
      if(error.status === 400) {
        alert("email is already in use");
      }

      console.error(error);
      

    });
    

  }

  private login(authRequest: AuthRequestDTO) {

    this.authService.getJwtTokenFromServer(authRequest).subscribe((jwtToken: JwtTokenDTO) => {

      // Save jwt Token
      this.authService.saveJwtToken(jwtToken);

      //--------------------------------------------------------------------------------
      // Load Current User from Server - by User E-mail
      //--------------------------------------------------------------------------------
      let userEmail: string = this.authService.decodeJwtToken(jwtToken).sub;
      
      this.userService.getUserByEmail(userEmail).subscribe((currentUser: UserDTO) => {
        
        // Save Current User to Local Storage
        let savedCurrentUser: UserDTO = this.authService.saveCurrentUser(currentUser);
        
        this.router.navigate([""]);
        
      }, (error: Response) => {
        console.error(error);
      });

      //--------------------------------------------------------------------------------

    }, (error: Response) => {
      console.error(error);
    });

  }
  //--------------------------------------------------------------------------------------------------------------------

  private checkEmail(control: AbstractControl): Observable<ValidationErrors | null> {

    let email: string = control.value;

    
    return this.userService.checkEmailExists(email).pipe(
      map((exists) => {
        if (exists === false) {
          return null; // no error
        } else {
          return { emailExists: true };
        }
      })
    );

  }

}
