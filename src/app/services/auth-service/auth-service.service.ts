import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { UserDTO } from '../../other/models/user/userDTO.interface';
import { AuthRequestDTO } from '../../other/models/auth-request/authRequest.interface';
import { JwtTokenDTO } from '../../other/models/jwtToken/jwtTokenDTO.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DecodedJwtTokenDTO } from '../../other/models/jwtToken/decodedJwtTokenDTO.interface';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = "http://localhost:8080/auth";

  constructor(private http: HttpClient, private userService: UserService) {

  }

  //--------------------------------------------------------------------------------------------------------------------
  // TEST - This is unprotected URL used for testing only
  //--------------------------------------------------------------------------------------------------------------------
  getWelcome(): Observable<any> {

    let headers = new HttpHeaders({
      "Accept": "text/plain"
    });

    return this.http.get(this.authUrl + "/welcome", { headers: headers, responseType: "text" });
  }
  //--------------------------------------------------------------------------------------------------------------------
  
  //--------------------------------------------------------------------------------------------------------------------
  // Get JWT Token - from Server
  //--------------------------------------------------------------------------------------------------------------------
  getJwtTokenFromServer(authRequest: AuthRequestDTO): Observable<JwtTokenDTO> {
    return this.http.post<JwtTokenDTO>(this.authUrl + "/generateToken", authRequest);
  }
  //--------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------
  // Login - Login Current User
  //--------------------------------------------------------------------------------------------------------------------
  private login(authRequest: AuthRequestDTO) {

    this.getJwtTokenFromServer(authRequest).subscribe((jwtToken: JwtTokenDTO) => {

      // Save jwt Token
      this.saveJwtToken(jwtToken);

      //--------------------------------------------------------------------------------
      // Load Current User from Server - by User E-mail
      //--------------------------------------------------------------------------------
      let userEmail: string = this.decodeJwtToken(jwtToken).sub;
      
      this.userService.getUserByEmail(userEmail).subscribe((currentUser: UserDTO) => {
        
        // Save Current User to Local Storage
        this.saveCurrentUser(currentUser);

        // let savedCurrentUser: UserDTO = this.saveCurrentUser(currentUser);
        // console.log(savedCurrentUser);
        
      }, (error: Response) => {
        console.error(error);
      });

      //--------------------------------------------------------------------------------

    }, (error: Response) => {
      console.error(error);
    });

  }
  //--------------------------------------------------------------------------------------------------------------------


  //--------------------------------------------------------------------------------------------------------------------
  // Logout - removes JWT Token and Current User
  //--------------------------------------------------------------------------------------------------------------------
  logout() {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("currentUser");
  }
  //--------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------
  // Get JWT Token - if JWT Token does not Exist returs - NULL
  //--------------------------------------------------------------------------------------------------------------------
  getJwtToken(): JwtTokenDTO | null {

    let rawJwtToken = localStorage.getItem("jwtToken");
    if(rawJwtToken === null) {
      return null;
    }

    let jwtToken = JSON.parse(rawJwtToken as string);
    
    return jwtToken;

  }
  //--------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------
  // Save JWT Token - to Local Storage, returns Saved JWT Token
  //--------------------------------------------------------------------------------------------------------------------
  saveJwtToken(jwtToken: JwtTokenDTO): JwtTokenDTO {

    // Save JWT Token in Local Storage
    localStorage.setItem("jwtToken", JSON.stringify(jwtToken));
    
    // Get JWT Token from Local Storage
    let rawSavedJwtToken = localStorage.getItem("jwtToken");
    if(rawSavedJwtToken === null) {
      try {
        throw new Error("No JWT Token found!");
      } catch (error) {
        console.error(error);
      }
    }
    
    // Returns saved
    let savedJwtToken: JwtTokenDTO = JSON.parse(rawSavedJwtToken as string);

    return jwtToken;
  }
  //--------------------------------------------------------------------------------------------------------------------
  
  //--------------------------------------------------------------------------------------------------------------------
  // Checks if User is currently logged in - Checks if JWT Token exists and JWT Token Expiration Date
  //--------------------------------------------------------------------------------------------------------------------
  isLoggedIn(): Boolean {
    
    // Check if JWT Token Exists
    if(this.existstJwtToken() === false) {
      return false;
    }

    let jwtToken: JwtTokenDTO = this.getJwtToken() as JwtTokenDTO;  

    // Check if JWT Token is Expired
    if(this.isJwtTokenExpired(jwtToken) === true) {
      return false;
    }
    
    return true;
  }
  //--------------------------------------------------------------------------------------------------------------------
  
  //--------------------------------------------------------------------------------------------------------------------
  // Check if JWT Token Exists
  //--------------------------------------------------------------------------------------------------------------------
  existstJwtToken(): Boolean {

    let rawJwtToken = localStorage.getItem("jwtToken");
    if(rawJwtToken === null) {
      return false;
    }

    return true;

  }
  //--------------------------------------------------------------------------------------------------------------------
 
  //--------------------------------------------------------------------------------------------------------------------
  // Checks if JWT Token is Expired
  //--------------------------------------------------------------------------------------------------------------------
  isJwtTokenExpired(jwtToken: JwtTokenDTO): Boolean {

    let jwtTokenHelper = new JwtHelperService(JSON.stringify(jwtToken.jwtToken));
    let jwtTokenExpired = jwtTokenHelper.isTokenExpired(JSON.stringify(jwtToken.jwtToken));

    if(jwtTokenExpired === true) {
      return true;
    }

    return false;

  }
  //--------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------
  // Save Current User - to Local Storage
  //--------------------------------------------------------------------------------------------------------------------
  saveCurrentUser(user: UserDTO): UserDTO {

    localStorage.setItem("currentUser", JSON.stringify(user));

    let currentUser = this.getCurrentUser() as UserDTO;
    return currentUser;
  }
  //--------------------------------------------------------------------------------------------------------------------
  
  //--------------------------------------------------------------------------------------------------------------------
  // Get Current User - from Local Storage
  //--------------------------------------------------------------------------------------------------------------------
  getCurrentUser(): UserDTO | null {

    if(this.existsCurrentUser() === false) {
      try {
        throw new Error("No saved Current User!");
      } catch (error) {
        console.error(error);
        return null;
      }
    }

    let rawCurrentUser = localStorage.getItem("currentUser");
    let currentUser: UserDTO = JSON.parse(rawCurrentUser as string);
    return currentUser;

  }
  //--------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------
  // Exists Curent User - check if Current User is saved to Local Storage
  //--------------------------------------------------------------------------------------------------------------------
  existsCurrentUser() {

    let rawCurrentUser = localStorage.getItem("currentUser");
    if(rawCurrentUser === null) {
      return false;
    }
    
    return true;

  }

  //--------------------------------------------------------------------------------------------------------------------
  // Remove Current User
  //--------------------------------------------------------------------------------------------------------------------
  removeCurrentUser(): Boolean {

    if(this.existsCurrentUser() === false) {
      try {
        throw new Error("No Current User found!");
      } catch (error) {
        console.error(error);
        return false;
      }
    }

    localStorage.removeItem("currentUser");
    return true;
  }
  //--------------------------------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------------------
  // Decode JWT Token
  //--------------------------------------------------------------------------------------------------------------------
  decodeJwtToken(jwtToken: JwtTokenDTO): DecodedJwtTokenDTO {

    let jwtTokenHelper = new JwtHelperService(JSON.stringify(jwtToken.jwtToken));

    let decodedJwtToken: DecodedJwtTokenDTO | null = jwtTokenHelper.decodeToken(jwtToken.jwtToken);
    if(decodedJwtToken === null) {
      try {
        throw new Error("Invalid JWT Token!");
      } catch (error) {
        console.error(error);
      }
    }

    return decodedJwtToken as DecodedJwtTokenDTO;
  }  

  
}


