import { animate, animation, style, transition, trigger } from "@angular/animations";
import { delay } from "rxjs";

//--------------------------------------------------------------
// SlideDown - Animation
//--------------------------------------------------------------
export let slideDown = animation([

    style({ transform: "translateY(-100%)" }),
    animate("{{ duration }} {{ delay }} {{ easing }}")

], {
    // Default SlideDown Parameters
    params: {
        duration: "2s",
        delay: "0s",
        easing: "ease-out"
    }
});
//--------------------------------------------------------------

