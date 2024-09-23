import { AbstractControl, ValidationErrors } from "@angular/forms";

export class InputImageValidators {

    static imageCheck(control: AbstractControl): ValidationErrors | null {

        if(control.value === "") {
            return {imageCheck: true};
        }
        
        return null;
    }

}