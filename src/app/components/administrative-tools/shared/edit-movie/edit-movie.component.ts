import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatisticCardModelDTO } from '../../../../other/models/statistic-card-model/statistic-card-model.interface';
import { StatisticCardModel } from '../../../../other/models/statistic-card-model/statistic-card-model.class';
import { faMoneyBill, faTag, faUsersViewfinder } from '@fortawesome/free-solid-svg-icons';
import { slideDown, slideRight } from '../../../../other/animations/slide.animation';


@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.css',
  animations: [
    slideDown, slideRight
  ]
})
export class EditMovieComponent implements OnInit{

  defaultImage: string = "../../../../../assets/images/image-placeholder-1.jpg";

  private movieId!: number;
  
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Statistic Cards
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  profitCardValues: StatisticCardModelDTO = new StatisticCardModel("Profit", "$2.150", "+$1.500", "since last week", faMoneyBill, "#f97316", "#feddc7");
  viewsCardValues: StatisticCardModelDTO = new StatisticCardModel("Views", "152", "+24", "since last week", faUsersViewfinder, "#3b82f6", "#d0e1fd");
  reservationsCardValues: StatisticCardModelDTO = new StatisticCardModel("Reservations", "256", "+10", "since last week", faTag, "#a855f7", "#ead6fd");
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------

  constructor(private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {

    // Get MovieId from URL Variable Parameter
    this.movieId = +(this.activatedRoute.snapshot.paramMap.get("movieId") as String);

  }

}
