import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit{

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
    
    this.authService.logout();
    this.router.navigate([""]);

  }

}
