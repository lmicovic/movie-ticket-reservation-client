import { Day } from "./enums";

export class Util {

    constructor() {

    }

    //--------------------------------------------------------------------------------------------
    // Get LastNMonths in String representation - example: currentDate = (2024-9-12), it will return ["avgust", "july", "jul", "may", "april", "mart"]
    //--------------------------------------------------------------------------------------------
    // inputDate - passed Date
    // lastNthMonth - get the name of last N months based on input Date. If inputDate is september, we will get (avgust, july, jul, may, april, mart)
    // returs - last N months based on inputDate value
    //--------------------------------------------------------------------------------------------
    public static getLastNMonths(inputDate: Date, lastNthMonths: number): string[] {
        
        
        let lastNthMonthsString: string[] = [];                                                             // lastNthMonths names - in string representation (avgust, july, jul, may, april, mart)
        for(let i = 1; i <= lastNthMonths; i++) {
        let lastDate: Date = this.addMonths(inputDate, -i);                                               // lastNDate in Date representation, example: 2024-7-31
        let lastMonthName: string = lastDate.toLocaleString('default', { month: 'long' });                // lastNMonthName in String representation, example: july
        
        lastNthMonthsString.push(lastMonthName);
        }

        return lastNthMonthsString;
    }

    //--------------------------------------------------------------------------------------------
    // Get Date +- months of inputDate - this calculation is needed because of edge case, some months has 31 day and others have 30.
    //--------------------------------------------------------------------------------------------
    public static addMonths(inputDate: any, months: any) {

        const date = new Date(inputDate);
        date.setDate(1);                                        // set passed inputDate day to 1st day in the month    
        date.setMonth(date.getMonth() + months);                // get Date that is +- passed month of passed inputDate

        // In variable date is stored current Day - 1 (month) - example: if current is 12.9, in date is stored 12.8 - this is edge case scenario handler, some months have 31 and others have 30. If passedDate is has 31 days and (passedDate - 1) has 30 days i won't be 31 i will be 1st day of the next month
        // example: passedDate: 2024-7-31, months: -1(2024-6-31) - but there is no 31 in 6th month so it will be defined as 1.7, that is why we use Math.min() to get (2024-6-30) instead of (2024-7.1)
        date.setDate(Math.min(inputDate.getDate(), this.getDaysInMonth(date.getFullYear(), date.getMonth() + 1)));          // (inputDate - passed Date, how many days in month after passed date. 
        
        return date;

    }

    // Returns how many days passed month of the year has
    private static getDaysInMonth(year: any, month: any) {
        return new Date(year, month, 0).getDate();
    }
    //--------------------------------------------------------------------------------------------


    //--------------------------------------------------------------------------------------------
    // Translate String Day to Enum
    //--------------------------------------------------------------------------------------------
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
    //--------------------------------------------------------------------------------------------
}