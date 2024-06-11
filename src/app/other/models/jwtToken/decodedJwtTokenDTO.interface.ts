export interface DecodedJwtTokenDTO {

    // exp: JWT Token Expiration Date
    // iat: JWT Token Issued Date
    // iss: Name who Issued JWT Token
    // sub: Name to who is Issued JWT Token

    exp: number,
    iat: number,
    iss: string,
    sub: string

}