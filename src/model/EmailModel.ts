import { ContactType } from "../enum/ContactEnum";

export type EmailModel = {
    id: number;
    emailType: ContactType;
    emailAddress: string;
}