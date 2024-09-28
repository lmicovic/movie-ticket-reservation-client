import { TableDataDTO } from "./tableDataDTO.interface";

export class TableData implements TableDataDTO {

    constructor(public headers: string[], public data: string[][]) {
        
    }

}