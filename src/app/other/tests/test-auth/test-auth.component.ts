import { JwtToken } from './../../models/jwtToken/jwtToken.class';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth-service/auth-service.service';
import { AuthRequestDTO } from '../../models/auth-request/authRequest.interface';
import { JwtTokenDTO } from '../../models/jwtToken/jwtTokenDTO.interface';
import { AuthRequest } from '../../models/auth-request/authRequest.class';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../../../services/user/user.service';
import { UserDTO } from '../../models/user/userDTO.interface';

@Component({
  selector: 'test-auth',
  templateUrl: './test-auth.component.html',
  styleUrl: './test-auth.component.css'
})
export class TestAuthComponent implements OnInit {

  constructor(private authService: AuthService, private userService: UserService) {

  }

  ngOnInit(): void {
    
    // this.getWelcome();
    
    // let authRequest: AuthRequestDTO = new AuthRequest("peraperic@gmail.com", "test123");
    // this.login(authRequest);

  }

  getWelcome() {
    this.authService.getWelcome().subscribe((response: any) => {
      console.log(response);
    }, (error: Response) => {
      console.error(error);
    });
  }
  
  login(authRequest: AuthRequestDTO) {

    // this.authService.login(authRequest);

  }
  

    

}
