//----------------------------------------------------------------------------------------------------------------------
// Represent Specification Interface for values for statistic-card.component.ts Component

import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

//----------------------------------------------------------------------------------------------------------------------
export interface StatisticCardModelDTO {

    tittle: string,
    value: string,
    lastWeekValue: string,
    lastWeekValueDescription: string;
    icon: IconDefinition,
    iconColor: string,
    iconBackgroundColor: string

}