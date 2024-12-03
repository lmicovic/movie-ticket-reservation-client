import { Component, OnInit } from '@angular/core';
import { Util } from '../../../../other/util.class';

@Component({
  selector: 'app-ticket-sales-graph',
  templateUrl: './ticket-sales-graph.component.html',
  styleUrl: './ticket-sales-graph.component.css'
})
export class TicketSalesGraphComponent implements OnInit {

  chartData: any;
  chartOptions: any;

  constructor() {

  }

  ngOnInit(): void {
    
    this.initGraph();

  }

  //--------------------------------------------------------------------------------------------
  // Initialize Graph Data and Style - Using Char.js 3.9.1 and PrimeNG Library
  //--------------------------------------------------------------------------------------------
  private initGraph() {

    let lastNMonthsName: string[] = Util.getLastNMonths(new Date(), 6).reverse();
    
    // Initialize Graph Data
    this.chartData = {
      labels: lastNMonthsName,
      datasets: [
          {
              label: 'Tickets Sold',
              data: [65, 59, 80, 81, 56, 55],
              fill: false,
              borderColor: "#3b82f6",
              tension: 0.4
          }
      ]
    };

    // Initialize Graph Options
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
          legend: {
              labels: {
                  color: "black"
              }
          }
      },
      scales: {
          x: {
              // beginAtZero: true,
              ticks: {
                  color: "black"
              },
              grid: {
                  color: "#e2e8f0",
                  drawBorder: true
              }
          },
          y: {
              // beginAtZero: true,
              ticks: {
                  color: "black"
              },
              grid: {
                  color: "#e2e8f0",
                  drawBorder: true
              }
          }
      }
    };

  }
  
}
