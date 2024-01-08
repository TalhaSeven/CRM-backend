import { LoginModel } from "./LoginModel";

export interface RegisterModel extends LoginModel {
    firstName: string;
    lastName: string;
}