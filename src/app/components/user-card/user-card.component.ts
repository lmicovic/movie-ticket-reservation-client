import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { User } from '../../other/models/user/user.class';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { UserDTO } from '../../other/models/user/userDTO.interface';
import { AuthService } from '../../services/auth-service/auth-service.service';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent implements OnInit, OnChanges{

  @Input("user")
  user: User | UserDTO | undefined = undefined;

  @Input("userImage")
  userImage: string | undefined = ".././../../assets/images/user-profil-image-empty.png";

  @Output("editUserMode")
  editUserMode = new EventEmitter<boolean>();
  
  loggedUser: boolean = true;
  editFlag: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, public authService: AuthService) {

    

  }

  ngOnInit(): void {

    this.loadUser();

  }

  ngOnChanges(changes: SimpleChanges): void {
        
    if(changes["user"] !== undefined && changes["user"].firstChange === false) {
      // console.log(this.user);
    }

    if(changes["userImage"] !== undefined && changes["userImage"].firstChange === false) {
      (this.user as User).image = this.userImage;
    }

    // console.log(changes["loggedUser"]);
    

    if(changes["loggedUser"] !== undefined && changes["loggedUser"].currentValue === false) {
      this.editUserMode.emit(this.loggedUser);
      console.log(this.user);
      // console.log("test");
      
    }

  }

  edit($event: Event) {

    $event.stopPropagation();
    
    this.editFlag = !this.editFlag;
    this.editUserMode.emit(this.editFlag);        

  }

  loadUser() {
    
    

    this.route.paramMap.subscribe((paramMap) => {
      
      let userId = +(paramMap.get("userId") as string);
      
      this.userService.getById(userId).subscribe((selectedUser: UserDTO) => {

        this.user = selectedUser;
        this.userService.getUserImage(userId).subscribe((userImage: Blob) => {
          
          if(userImage.size === 0) {
            this.user!.image = undefined;
          }
          else if(userImage.size > 0) {
            this.user!.image = URL.createObjectURL(userImage);
          }
          
        }, (error: Response) => {
          console.error(error);
        });

      }, (error: Response) => {
        console.error(error);
      });

      
    });
    

    
    
  }

  isLoggedUser() {

    if(this.authService.isLoggedIn() === true && this.authService.getCurrentUser()?.id === this.user?.id) {
      // this.editFlag = true;
      this.editUserMode.emit(this.editFlag);        
      return true;
    }

    // this.editFlag = false;
    // this.editUserMode.emit(this.editFlag);
    return false;

  }

  logout($event: Event) {

    $event.stopPropagation();
    
    this.authService.logout();
    this.router.navigate([""]);
  }

}
