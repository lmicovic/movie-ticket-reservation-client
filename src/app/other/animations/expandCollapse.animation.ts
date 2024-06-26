import { animate, state, style, transition, trigger } from "@angular/animations";

export let expandCollapse = trigger("expandCollapse", [

    state("collapse", style({ height: 0, overflow: "hidden", paddingTop: 0, paddingBottom: 0 })),
    state("expand", style({ height: "*", overflow: "hidden", padding: "*" })),

    transition("collapse => expand", [
      animate("300ms ease-out")
    ]),

    transition("expand => collapse", [
      animate("300ms ease-in")
    ])

  ]); 