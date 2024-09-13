import { Component, OnInit } from '@angular/core';
import { fade } from '././other/animations/fade.animation';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'project';

  constructor(private primengConfig: PrimeNGConfig) {

  }
  
  ngOnInit(): void {
    
  }

}
