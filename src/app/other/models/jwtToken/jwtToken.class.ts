import { JwtTokenDTO } from "./jwtTokenDTO.interface";

export class JwtToken implements JwtTokenDTO {

    constructor(public jwtToken: string) {

    }

}