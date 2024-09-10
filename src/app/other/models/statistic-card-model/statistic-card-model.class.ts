import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { StatisticCardModelDTO } from "./statistic-card-model.interface";

export class StatisticCardModel implements StatisticCardModelDTO {
    
    constructor(public tittle: string, public value: string, public lastWeekValue: string, public lastWeekValueDescription: string, public icon: IconDefinition, public iconColor: string, public iconBackgroundColor: string) {
        
    } 

}