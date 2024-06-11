import { UserInfoDTO } from "./userInfoDTO.interface";

export class UserInfo implements UserInfoDTO {
    
    constructor(public id: number, public firstname: string, public lastname: string, public email: string, public password: string, public roles: string) {

    }

    // public static transform(userInfo: UserInfo): UserInfoDTO {
    //     return {
    //         id: userInfo.id,
    //         firstname: userInfo.firstname,
    //         lastname: userInfo.lastname,
    //         email: userInfo.email,
    //         password: userInfo.password
    //     }
    // }

}