import { ContactEnum } from "../enum/ContactEnum";

export type AddressModel = {
    id: number;
    addressType: ContactEnum;
    addressLine: string;
    location: string;
}