import { AuthRequestDTO } from "./authRequest.interface";

export class AuthRequest implements AuthRequestDTO {

    constructor(public email: string, public password: string) {

    }

}