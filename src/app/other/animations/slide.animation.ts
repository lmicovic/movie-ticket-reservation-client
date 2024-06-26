import { animate, animation, style, transition, trigger, useAnimation } from "@angular/animations";
import { delay } from "rxjs";

//--------------------------------------------------------------
// SlideDown - Animation
//--------------------------------------------------------------
export let slideDownAnimation = animation([

    style({ transform: "translateY(-100%)" }),
    animate("{{ duration }} {{ delay }} {{ easing }}")

], {
    // Default SlideDown Parameters
    params: {
        duration: "1s",
        delay: "0s",
        easing: "ease-out"
    }
});
//--------------------------------------------------------------

//--------------------------------------------------------------
// SlideTop - Animation
//--------------------------------------------------------------
export let slideTopAnimation = animation([

    style({ transform: "translateY(100%)" }),
    animate("{{ duration }} {{ delay }} {{ easing }}")

], {
    // Default SlideDown Parameters
    params: {
        duration: "1s",
        delay: "0s",
        easing: "ease-out"
    }
});
//--------------------------------------------------------------

//--------------------------------------------------------------
// SlideRight - Animation
//--------------------------------------------------------------
export let slideRightAnimation = animation([

    style({ transform: "translateX(-100%)" }),
    animate("{{ duration }} {{ delay }} {{ easing }}", style( { transform: "*" } ))

], {
    // Default SlideRight Parameters
    params: {
        duration: "1s",
        delay: "0s",
        easing: "ease-out"
    }
});
//--------------------------------------------------------------



//--------------------------------------------------------------
// SlideDown - Animation Trigger
//--------------------------------------------------------------
export let slideDown = trigger("slideDown", [

    transition(":enter", [
        useAnimation(slideDownAnimation)
    ])

]);
//--------------------------------------------------------------

//--------------------------------------------------------------
// SlideTop - Animation Trigger
//--------------------------------------------------------------
export let slideTop = trigger("slideTop", [

    transition(":enter", [
        useAnimation(slideTopAnimation)
    ])

]);
//--------------------------------------------------------------

//--------------------------------------------------------------
// SlideRight - Animation Trigger
//--------------------------------------------------------------
export let slideRight = trigger("slideRight", [

    transition(":enter", [
        useAnimation(slideRightAnimation)
    ])

]);
//--------------------------------------------------------------