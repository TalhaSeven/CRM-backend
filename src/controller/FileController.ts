import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Country } from "../entity/Country";
import { City } from "../entity/City";
import { District } from "../entity/District";
import { Town } from "../entity/Town";
import { User } from "../entity/User";
import { Phone } from "../entity/Phone";
import { Email } from "../entity/Email";
import { Address } from "../entity/Address";
import { ContactEnum } from "../enum/ContactEnum";

export class FileController {
    private countryRepository = AppDataSource.getRepository(Country)
    private cityRepository = AppDataSource.getRepository(City)
    private districtRepository = AppDataSource.getRepository(District)
    private townRepository = AppDataSource.getRepository(Town)
    private userRepository = AppDataSource.getRepository(User)
    private phoneRepository = AppDataSource.getRepository(Phone)
    private emailRepository = AppDataSource.getRepository(Email)
    private addressRepository = AppDataSource.getRepository(Address)

    async all(request: Request, response: Response, next: NextFunction) {
        const fs = require('fs');
        const file = await fs.promises.readFile('./public/address.json', 'utf8', (err: any, data: any) => {
            if (err) return false
            return true
        });

        const fileJson = JSON.parse(file)

        await fileJson.map(async (k: any) => {
            const country = Object.assign(new Country(), {
                name: k.name
            })
            const insertCountry = await this.countryRepository.save(country)

            k.sub.map(async (l: any) => {
                const city = Object.assign(new City(), {
                    name: l.name,
                    country: insertCountry
                })
                const insertCity = await this.cityRepository.save(city)

                l.sub.map(async (t: any) => {
                    const district = Object.assign(new District(), {
                        name: t.name,
                        city: insertCity
                    })
                    const insertDistrict = await this.districtRepository.save(district)

                    t.sub.map(async (v: any) => {
                        const town = Object.assign(new Town(), {
                            name: v,
                            district: insertDistrict
                        })
                        const insertTown = await this.townRepository.save(town)
                    })
                })
            })
        })

        const users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        for (let x of users) {
            const user = Object.assign(new User(), {
                firstName: "Test " + x,
                lastName: "User " + x,
                email: "abc" + x + "@xyz.com",
                password: (Math.random() * 1000000).toFixed(0)
            })
            await this.userRepository.save(user)
        }

        const user = await this.userRepository.findOne({ where: { id: 1 } })

        const phone = Object.assign(new Phone(), {
            phoneType: ContactEnum.HOME,
            phoneNumber: "500 000 00 00",
            user
        })
        await this.phoneRepository.save(phone)

        const email = Object.assign(new Email(), {
            emailType: ContactEnum.HOME,
            emailAddress: "abc@xyz.com",
            user
        })
        await this.emailRepository.save(email)

        const country = await this.countryRepository.findOne({ where: { id: 1 } })
        const city = await this.cityRepository.findOne({ where: { id: 28 } })
        const district = await this.districtRepository.findOne({ where: { id: 332 } })
        const town = await this.townRepository.findOne({ where: { id: 17572 } })

        const address = Object.assign(new Address(), {
            addressType: ContactEnum.HOME,
            addressLine: "12046 SK",
            street: "12046",
            post_code: "20000",
            location: "123,456",
            user,
            country,
            city,
            district,
            town
        })
        await this.addressRepository.save(address)

        return true
    }
}