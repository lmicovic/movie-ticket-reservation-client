import { Component, ElementRef, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthRequestDTO } from '../../other/models/auth-request/authRequest.interface';
import { AuthRequest } from '../../other/models/auth-request/authRequest.class';
import { AuthService } from '../../services/auth-service/auth-service.service';
import { UserService } from '../../services/user/user.service';
import { JwtTokenDTO } from '../../other/models/jwtToken/jwtTokenDTO.interface';
import { UserDTO } from '../../other/models/user/userDTO.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {

  // @media screen and (max-width: 800px)
  widthLimit = 800;                           // Koristi se da bi prikazali ili sakrili Menu Item u zavistnosti od Sirine Ekrana. Koristi se u - menu.component.html.
  window;                                     // Koristi se da bi mogli da pristupimo window Objektu u - menu.component.html

  menuClosed = true;                          // menuClosed = true - navigation menu je zatvoren, menuClosed = false - navigation menu je otvoren.
  displayLoginPage = false;

  userLoginProfileImage = "../../../assets/images/user-profil-image.png";             // Predstavlja default sliku za korisnika za loginPage.

  //----------------------------------------------------------------
  // LoginPage Form
  //----------------------------------------------------------------
  loginForm = new FormGroup({
    email: new FormControl("peraperic@gmail.com", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl("Test!123!", [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")])
  }); 
  //----------------------------------------------------------------  

  constructor(private router: Router, private elementRef: ElementRef, private userService: UserService, public authService: AuthService) {

    this.window = window;

  }

  // Event - kada se resize window
  onResize($event: Event) {
    
    // console.log($event);
    // console.log(window.innerWidth);
    
  }

  // Kada se klikne na Menu Button, treba da se prikazu sve opcije Menija, samo ako je sirina ekrana manja od 800px.
  onMenuClick(elements: HTMLElement[]) {
    
    for (let i = 0; i < elements.length; i++) {
      
      if(this.menuClosed) {
        elements[i].style.display = "block";
      }
      else if(!this.menuClosed) {
        elements[i].style.display = "none";
      }
      
    }

    this.menuClosed = !this.menuClosed;
    
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
    console.log(authRequest);
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
        
        
        this.displayLoginPage = false;
        this.window.location.reload();

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

  //--------------------------------------------------------------------------------------------------------------------
  // Register New User:  Redirects on Register New User Page
  //--------------------------------------------------------------------------------------------------------------------
  onRegister() {
    this.displayLoginPage = false;
    this.router.navigate(["/register"]);
  }
  //--------------------------------------------------------------------------------------------------------------------

  
  // Otvara i zatvara Login Ekran.
  loginPageShow() {
    
    if(this.authService.isLoggedIn() === true) {
      // Redirect to User Profile Page
      this.router.navigate(["/user/preview/" + this.authService.getCurrentUser()?.id]);
    }
    else if(this.authService.isLoggedIn() === false) {
      this.displayLoginPage = !this.displayLoginPage;
    }

  }

  // Zatvara Login Ekran ako pritisnemo Escape
  @HostListener("window: keydown.escape")
  onEscape() {
    
    if(this.displayLoginPage === true) {
      this.displayLoginPage = false;
    }
    
  }


  // Zarvara Login Ekran ako pritisnemo misem bilo gde van Login Ekrana.
  @HostListener("document: mousedown", ["$event"])
  loginPageClose($event: any) {
    
    let modal = document.getElementById('login-modal') as HTMLElement;

    if($event.target === modal) {
      modal.style.display = "none";    
      this.displayLoginPage = false;
    }
   
    

  }

}
