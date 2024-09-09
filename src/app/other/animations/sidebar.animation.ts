import { animate, state, style, transition, trigger } from "@angular/animations";



export let sideBarAnimation = trigger("sideBarAnimation", [

    state("collapse", style( { transform: "translateX(-120%)", display: "none"} )),
    state("expand", style( { transform: "translateX(0%)" } )),

    transition("collapse => expand", [
        animate("300ms ease-out")
    ]),

    transition("expand => collapse", [
        animate("300ms ease-in")
    ])

]);