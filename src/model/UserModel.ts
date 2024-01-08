import { BaseUserModel } from "./BaseUserModel";

export interface UserModel extends BaseUserModel {
    id: number
    role: string;
    confirmed: string;
    createdAt: Date;
}