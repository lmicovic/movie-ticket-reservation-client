import { Day } from "./enums";

export class Util {

    constructor() {

    }

    // Translate String Day to Enum
    public static translateDay(day: string): number {

        switch (day.toLocaleLowerCase()) {
            case "sunday":
                return 10;
            case "monday":
                return 4;
            case "tuesday":
                return 5;
            case "wednesday":
                return 6;
            case "thursday":
                return 7;
            case "friday":
                return 8;
            case "saturday":
                return 9;
            default:
                try {
                    throw new Error("Wrong Day name:" + day);
                } catch (error) {
                    console.log(error);
                }
                return 0;
        }

        
    }


}