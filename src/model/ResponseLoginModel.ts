import { BaseUserModel } from "./BaseUserModel";

export interface ResponseLoginModel extends BaseUserModel {
    role: string;
    confirmed: string;
}