import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { UserDTO } from '../../models/user/userDTO.interface';
import { User } from '../../models/user/user.class';
import { UserInfo } from '../../models/user/userInfo.class';
import { UserInfoDTO } from '../../models/user/userInfoDTO.interface';
import { Movie } from '../../models/movie/movie.class';
import { MovieGenre } from '../../enums';
import { MovieDTO } from '../../models/movie/movieDTO.interface';
import { MovieService } from '../../../services/movie/movie.service';

@Component({
  selector: 'test-user',
  templateUrl: './test-user.component.html',
  styleUrl: './test-user.component.css'
})
export class TestUserComponent implements OnInit{

  jsonString: boolean = true;

  constructor(private userService: UserService, private movieService: MovieService) {

  }

  ngOnInit(): void {
    
    this.getAllUsers();
    this.getUserById();
    this.saveUser();
    this.updateUser();
    this.deleteUser();      // can not delete User
    this.getUserImage();
    this.getUsersBookmarks();
    this.addMovieToUserBookmarks();
    this.getUserWatchedMovies();
    this.addWatchedMovieToUser();
    this.checkEmailExists();

  }

  // this.userService.getById(1).subscribe((user: UserDTO) => {

  // }, (error: Response) => {

  // });


  getAllUsers() {

    this.userService.getAll().subscribe((users: UserDTO[]) => {

      if(this.jsonString === true) {
        console.log("Get All Users:\n" + JSON.stringify(users, null, 2));
      }
      else {
        console.log(users);
      }

      

    }, (error: Response) => {
      console.error(error);
    });

  }

  getUserById() {

    let userInfo: UserInfoDTO = new UserInfo(-1, "", "", "", "", "");
    let user: UserDTO = new User(-1, "", userInfo, [], [], []);
    

    this.userService.getById(1).subscribe((user: UserDTO) => {

      if(this.jsonString === true) {
        console.log("Get User by ID:\n" + JSON.stringify(user, null, 2));
      }
      else {
        console.log(user);
      }

      
            
    }, (error: Response) => {
      console.error(error);
      
    });

  }

  saveUser() {

    let userInfo: UserInfoDTO = new UserInfo(-1, "Test", "Test", "test@gmail.com", "test123", "ROLE_USER");
    let user: UserDTO = new User(-1, undefined, userInfo, [], [], []);

    this.userService.save(user).subscribe((savedUser: UserDTO) => {

      if(this.jsonString === true) {
        console.log("Saved User:\n" + JSON.stringify(savedUser, null, 2));
      }
      else {
        console.log(savedUser);
      }
      
      

    }, (error: Response) => {
      console.error(error);
    });

  }

  updateUser() {

    this.userService.getById(1).subscribe((user: UserDTO) => {

      user.userInfo.firstname = "Test";
      user.userInfo.lastname = "Test";

      this.userService.update(user).subscribe((updatedUser: UserDTO) => {

        if(this.jsonString === true) {
          console.log("Update User:\n" + JSON.stringify(updatedUser, null, 2));          
        }
        else {
          console.log(updatedUser);
          
        }

      }, (error: Response) => {
        console.error(error);
        
      });


    }, (error: Response) => {
      console.error(error);
      
    });

  }

  deleteUser() {

    this.userService.delete(1).subscribe((response) => {

      console.log(response);
      

    }, (error: Response) => {
      console.error(error);
    });

  }


  getUserImage() {

    this.userService.getById(2).subscribe((user: UserDTO) => {

      this.userService.getUserImage(user.id).subscribe((image: any) => {

        console.log(image);
        

      }, (error: Response) => {
        console.error(error);
        
      });

    }, (error: Response) => {
      console.error(error);
      
    });

  }

  updateUserImage() {

    console.error("Need to be tested in View...");
    

    // this.userService.getById(1).subscribe((user: UserDTO) => {

      

    //   this.userService.updateUserImage(1, ).subscribe((image: any) => {


    //     console.log(image);
        

    //   }, (error: Response) => {
    //     console.error(error);
        
    //   });

    // }, (error: Response) => {
    //   console.error(error);
      
    // });

  }

  getUsersBookmarks() {
    
    this.userService.getUserBookmarks(1).subscribe((userBookmarks: MovieDTO[]) => {

      if(this.jsonString === true) {
        console.log("User Bookmarks:\n" + JSON.stringify(userBookmarks, null, 2));
      }
      else {
        console.log(userBookmarks);
        
      }

    }, (error: Response) => {
      console.error(error);
    });    

  }

  addMovieToUserBookmarks() {

    this.movieService.getById(1).subscribe((movie: MovieDTO) => {

      this.userService.addMovieToUserBookmarks(1, movie.id as number).subscribe((user: UserDTO) => {
          
        console.log("Added Movie: " + movie.id + " to User: " + user.id);

      }, (error: Response) => {
        console.error(error);
      })

    }, (error: Response) => {
      console.error(error);
    });    

  }

  getUserWatchedMovies() {

    this.userService.getUserWatchedMovies(1).subscribe((watchedMovies: MovieDTO[]) => {

      if(this.jsonString === true) {
        console.log("User Watched Movies:\n" + JSON.stringify(watchedMovies, null, 2));
      }
      else {
        console.log(watchedMovies);
      }

    }, (error: Response) => {
      console.error(error);
    }); 

  }

  addWatchedMovieToUser() {

    this.userService.addWatchedMovieToUser(1, 1).subscribe((user: UserDTO) => {

      console.log("Added watched Movie to User.");
      

    }, (error: Response) => {
      console.error(error);
    });

  }

  checkEmailExists() {
    
    this.userService.checkEmailExists("peraperic@gmail.com").subscribe((exists: Boolean) => {

      console.log("E-mail: peraperic@gmail.com - exists: " + exists);

    }, (error: Response) => {
      console.error(error);
    });

  }

}
