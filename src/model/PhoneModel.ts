import { ContactType } from "../enum/ContactEnum";

export type PhoneModel = {
    id: number;
    phoneType: ContactType;
    phoneNumber: string;
}