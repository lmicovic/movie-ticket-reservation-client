# Movie-Ticket-Reservation - frontend

Movie ticket reservation is client application built using [Angular 17](https://angular.io/docs "Angular 17"). This application is client application used for movie preview and ticket reservations.

This project represents client application for [movie-ticket-reservation-backend](https://github.com/lmicovic/movie-ticket-reservation-backend "movie-ticket-reservation-backend") application.

## Features
- **Movie preview:** enables preview of movies information.
- **Ticket Reservation:** allows ticket reservation for certain movie.
- **Search movie:** got section for searching movie based on preferred filter.
- **GUI Design:** simple GUI design that allows easy navigation through the application and user interaction.
- **User Accounts:** enables creation of user account, storing user’s information and history (watched movies, bookmarks, reservations, movie comments).
- **Security:** only authenticated user can interact with certain functions of the application (Ticket Reservation, Movie Comments, User Settings). But there are some features of application that are permitted to all unauthenticated visitors. (Movie Preview).

## Technical features
- The client application is built entirely using [Angular 17](https://angular.io/docs "Angular 17") framework.
- GUI components are coded using plain HTML and CSS without any additional libraries.
- This project is frontend application that communicates with [movie-ticket-reservation-backend](https://github.com/lmicovic/movie-ticket-reservation-backend "movie-ticket-reservation-backend") application, which is responsible for deploying data.

## Application Setup
1. Clone this application from current repository.
2.  Import project in to preffered code editor.
3. Install Angular [node_modules](https://blog.stackademic.com/understanding-node-modules-folder-in-angular-3ff6870c4227 "node_modules") – in this folder are stored all dependencies packets that are required to run Angular application.
4. To install node_modules point terminal in to Angular project root directory and type: ```npm install```
5.  Then run ```ng serve``` to start Angular application, client will be hosted at url: [http://localhost:4200/](http://localhost:4200/ "http://localhost:4200/")

**Note**: for application to work it is necessary to run [movie-ticket-reservation-backend](https://github.com/lmicovic/movie-ticket-reservation-backend "movie-ticket-reservation-backend") application.


