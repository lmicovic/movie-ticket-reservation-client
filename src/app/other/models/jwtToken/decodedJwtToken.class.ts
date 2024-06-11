export class DecodedJwtToken {

    // exp: JWT Token Expiration Date
    // iat: JWT Token Issued Date
    // iss: Name who Issued JWT Token
    // sub: Name to who is Issued JWT Token

    constructor(public exp: number, public iat: number, public iss: string, public sub: string) {

    }

}