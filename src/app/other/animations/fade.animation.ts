import { animate, animation, state, style, transition, trigger, useAnimation } from "@angular/animations";

//--------------------------------------------------------------
// FadeIn - Animation
//--------------------------------------------------------------
export let fadeIn = animation([
    
    style({ opacity: 0 }),
    animate("{{ duration }} {{ delay }} {{ easing }}"),

], {
    // Default FadeIn Parameters
    params: {
        duration: "2s",
        delay: "0s",
        easing: "ease-out"
    }
});
//--------------------------------------------------------------

//--------------------------------------------------------------
// FadeOut - Animation
//--------------------------------------------------------------
export let fadeOut = animation([
    
    style({ opacity: 0 }),
    animate("{{ duration }} {{ delay }} {{ easing }}")


], {
    // Default FadeOut Parameter
    params: {
        duration: "2s",
        delay: "0s",
        easing: "ease-in"
    }
});
//--------------------------------------------------------------

//--------------------------------------------------------------
// Fade Animation - Trigger
//--------------------------------------------------------------
export let fade = trigger("fade", [
    
    // FadeIN
    transition(":enter", [
        useAnimation(fadeIn),
    ]),

    // FadeOut
    transition(":leave", [
        useAnimation(fadeOut),
    ]),

]);
//--------------------------------------------------------------