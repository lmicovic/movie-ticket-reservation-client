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

export let mainContentAnimation = trigger("sideBarToggleAdminPageAnimation", [

    state("reduce", style( { transform: "translateX(0)" } )),
    state("enlarge", style( { transform: "translateX(0)" })),

    transition("reduce => enlarge", [
      animate("300ms ease-out")
    ]),

    transition("enlarge => reduce", [
        animate("300ms ease-in")
    ])

  ]);