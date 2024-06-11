import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { UserService } from "../services/user/user.service";
import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";


export class EmailValidators {

    
    constructor() {
        
    }
    
    
    // static emailInUse(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    //     // let email = control.value as string;
        
        

    //     // console.log(email);

    //     // return new Promise((resolve, reject) => {

    //     //     if(email === "myname@domain.com") {
    //     //         resolve(null);
    //     //     }

    //     //     this.userService.checkEmailExists(email).subscribe((response: Boolean) => {

    //     //         console.log(response);
                

    //     //     }, (error: Response) => {
                
    //     //         console.error(error);
    //     //         alert("Unexpected Error.")

    //     //     });

    //     // });


    //     // return new Promise((resolve, reject) => {

    //     //     setTimeout(() => {
    //     //         if(email === "test@domain.com") {
    //     //             resolve({emailInUse: true});
    //     //         }
    //     //         else {
    //     //             resolve(null);
    //     //         }
    //     //     }, 2000);
    //     // });

    // }



    static emailExists(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

        let email = control.value as string;
        
        return new Promise((resolve, reject) => {

            setTimeout(() => {
                if(email !== "test@domain.com") {
                    resolve({emailNotFound: true});
                }
                else {
                    resolve(null);
                }
            }, 2000);
        });

    }

    


}