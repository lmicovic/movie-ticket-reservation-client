import { AbstractControl, ValidationErrors } from "@angular/forms";


export class PasswordValidators {

    static passwordMatch(control: AbstractControl): ValidationErrors | null {

        let password = control.parent?.value.password;
        let passwordConfirm = control.value;

        if(password !== passwordConfirm) {
            return {passwordMatch: true};
        }
        
        return null;

    }

}