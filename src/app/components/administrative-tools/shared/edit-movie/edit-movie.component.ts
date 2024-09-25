import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.css'
})
export class EditMovieComponent implements OnInit{

  constructor(private activatedRoute: ActivatedRoute, public router: Router) {

  }

  ngOnInit(): void {

    

  }

}
