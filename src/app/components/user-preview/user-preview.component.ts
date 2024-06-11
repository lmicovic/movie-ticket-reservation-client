import { Component, Input } from '@angular/core';
import { User } from '../../other/models/user/user.class';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidators } from '../../validators/password.validators';
import { UserInfo } from '../../other/models/user/userInfo.class';
import { UserDTO } from '../../other/models/user/userDTO.interface';
import { AuthService } from '../../services/auth-service/auth-service.service';

@Component({
  selector: 'app-user-preview',
  templateUrl: './user-preview.component.html',
  styleUrl: './user-preview.component.css'
})
export class UserPreviewComponent {

  user!: User | UserDTO;
  editFlag: boolean = true;

  //-----------------------------------
  // Show Password
  //-----------------------------------
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  //-----------------------------------
  // Show Password - END
  //-----------------------------------

  form = new FormGroup({
    firstname: new FormControl("", [Validators.required], []),
    lastname: new FormControl("", [Validators.required], []),
    email: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")], []),
    password: new FormControl("", [Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")], []),
    confirmPassword: new FormControl("", [Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}"), PasswordValidators.passwordMatch], [])
  });

  constructor(private router: ActivatedRoute, private userService: UserService, private authService: AuthService) {

  }

  ngOnInit(): void {
    
    // Load User by userId
    let userId = +(this.router.snapshot.paramMap.get("userId") as string);
    this.userService.getById(userId).subscribe((userResponse: UserDTO) => {

      // console.log(userResponse);
      this.user = userResponse;

      this.form.get("firstname")?.setValue(this.user.userInfo.firstname);
      this.form.get("lastname")?.setValue(this.user.userInfo.lastname);
      this.form.get("email")?.setValue(this.user.userInfo.email);

      // Load User Image
      this.userService.getUserImage(this.user.id).subscribe((userImage: Blob) => {

        
        (this.user as User).image = URL.createObjectURL(userImage);
        // console.log(this.user);
        
        // Load users bookmarks
        //...
        //-----------------------------

      }, (error: Response) => {

        if(error.status === 404) {
          alert("User with id: " + userId + " is not found");
          console.error("User with id: " + userId + " is not found");
          return;
        }
        else {
          alert("Unexpected Error.");
          console.error(error);
          return;
        }

      });
      

    }, (error: Response) => {

      if(error.status === 404) {
        alert("User with id: " + userId + " is not found");
        console.error("User with id: " + userId + " is not found");
        return;
      }
      else {
        alert("Unexpected Error.");
        console.error(error);
        return;
      }
      

    });
    

  }

  changeShowPassword() {

    this.showPassword = !this.showPassword;

  }

  changeShowConfirmPassword($event: Event) {

    this.showConfirmPassword = !this.showConfirmPassword;
    
  }


  editUserMode(editMode: boolean) {

    this.editFlag = editMode;
    
  }

  updateUser($event: Event) {

    $event.stopPropagation();

    // console.log(this.form);
  
    let firstname = this.form.get("firstname")?.value;
    let lastname = this.form.get("lastname")?.value;
    let email = this.form.get("email")?.value;
    let password = this.form.get("password")?.value;

    // @ts-ignore: Unreachable code error
    let image: File = document.getElementById("profile-image")?.files[0];
    password = (password === undefined || password === "") ? this.user.userInfo.password : password;

    

    let userInfo = new UserInfo(this.user.id, (firstname as string), (lastname as string), (email as string), (password as string), "ROLE_USER");
    let user: UserDTO = new User(this.user.id, (image === undefined) ? this.user.image : undefined, userInfo, (this.user as User).watchedMovies, (this.user as User).bookmarks, (this.user as User).reservations);


    this.userService.update(user).subscribe((savedUser: UserDTO) => {


      this.userService.getUserImage(this.user.id).subscribe((response: Blob) => {
        this.user = savedUser;
        this.user.image = URL.createObjectURL(response);
        this.authService.saveCurrentUser(this.user);
      }, (error: Response) => {
        console.error(error);
        alert("Unexpected Error.");
      });
      


      // Send User Profile Image
      if(image !== undefined) {
        this.userService.updateUserImage(this.user.id, image).subscribe((response: any) => {

          
          // Get User Image
          this.userService.getUserImage(this.user.id).subscribe((userImageResponse) => {

            this.user.image = URL.createObjectURL(userImageResponse);
            
            this.authService.saveCurrentUser(this.user);

          }, (error: Response) => {
            console.error(error);
            alert("Unexpected Errors.");
          })
        }, (error: Response) => {
          console.error(error);
          alert("Unexpected Errors.");
        });
      }
    }, (error: Response) => {
      console.error(error);
      alert("Unexpected Error.")
    });
    
  }

  isLoggedUser() {

    if(this.authService.isLoggedIn() === true && this.authService.getCurrentUser()?.id === this.user?.id) {
      // this.editFlag = true;
      // this.editUserMode.emit(this.editFlag);        
      return true;
    }

    // this.editFlag = false;
    // this.editUserMode.emit(this.editFlag);
    return false;

  }

}
