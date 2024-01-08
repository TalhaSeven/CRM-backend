import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { City } from "../entity/City"
import { Country } from "../entity/Country"
import { Address } from "../entity/Address"

export class CityController {

    private cityRepository = AppDataSource.getRepository(City)
    private countryRepository = AppDataSource.getRepository(Country)
    private addressRepository = AppDataSource.getRepository(Address)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.cityRepository.find({ relations: { address: true, district: { town: true }, country: true } })
    }

    async cityUsers(request: Request, response: Response, next: NextFunction) {
        const cityId = parseInt(request.params.cityId)

        const city = await this.cityRepository.findOne({where: {id: cityId}})

        if(!city){
            return "şehir bulunamadı"
        }

        const address = this.addressRepository.find({where: {id: cityId}})
        if(!address){
            return "adres bulunamadı"
        }

        return address
    }

    async save(request: Request, response: Request, next: NextFunction) {
        const { name, countryId } = request.body

        const country = await this.countryRepository.findOne({ where: { id: countryId } })

        const city = Object.assign(new City(), {
            name,
            country
        })

        return this.cityRepository.save(city)
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        const { name, countryId } = request.body

        const country = await this.countryRepository.findOne({ where: { id: countryId } })

        if (country)
            return this.cityRepository.update({ id }, { name, country })
        else
            return false
    }
}