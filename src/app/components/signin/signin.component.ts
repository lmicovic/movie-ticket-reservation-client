import { Component } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailValidators } from '../../validators/email.validators';
import { AuthService } from '../../services/auth-service/auth-service.service';
import { UserService } from '../../services/user/user.service';
import { AuthRequest } from '../../other/models/auth-request/authRequest.class';
import { AuthRequestDTO } from '../../other/models/auth-request/authRequest.interface';
import { UserDTO } from '../../other/models/user/userDTO.interface';
import { JwtTokenDTO } from '../../other/models/jwtToken/jwtTokenDTO.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  loginForm = new FormGroup({

    email: new FormControl("peraperic@gmail.com", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl("Test!123!", [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")])

  });

  showPassword: boolean = false;
  

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private userService: UserService) {

  }

  onShowPassword() {
    this.showPassword = !this.showPassword;
  }

  //-----------------------------------------------------------------------------------------------------
  // Login Current User  
  //-----------------------------------------------------------------------------------------------------
  // When Clicked Login Button in LoginPage
  //-----------------------------------------------------------------------------------------------------
  onLogin() {
    
    // Get Email and Password from Form
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;

    try {
     
      if(email === null || email === undefined) {
        throw new Error("Email is null or undefined: " + email);
      }

      if(password === null || password === undefined) {
        throw new Error("Password is null or undefined: " + password);
      }

    } catch (error) {
      console.error(error);
      return;
    }

    //-----------------------------------------------------------------------------------------------------
    // Login Current User
    //-----------------------------------------------------------------------------------------------------
    let authRequest: AuthRequestDTO = new AuthRequest(email as string, password as string);
    this.login(authRequest);

    //-----------------------------------------------------------------------------------------------------

  }
  //-----------------------------------------------------------------------------------------------------


  //--------------------------------------------------------------------------------------------------------------------
  // Login - Login Current User
  //--------------------------------------------------------------------------------------------------------------------
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
        console.log("Logged In");
        console.log("Current User:");
        console.log(savedCurrentUser);
        
        let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
        
        console.log(returnUrl);
        

        this.router.navigate([returnUrl || ""]);
        
        
        

        // let savedCurrentUser: UserDTO = this.saveCurrentUser(currentUser);
        // console.log(savedCurrentUser);
        
      }, (error: Response) => {
        console.error(error);
        this.loginForm.setErrors({"authentification": true});
      });

      //--------------------------------------------------------------------------------

    }, (error: Response) => {
      console.error(error);
      this.loginForm.setErrors({"authentification": true});
    });

  }
  //--------------------------------------------------------------------------------------------------------------------


}
