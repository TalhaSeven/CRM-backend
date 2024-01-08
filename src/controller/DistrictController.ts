import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from 'express'
import { District } from '../entity/District'
import { City } from '../entity/City'

export class DistrictController {
    private districtRepository = AppDataSource.getRepository(District)
    private cityRepository = AppDataSource.getRepository(City)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.districtRepository.find({ relations: { town: true } })
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { name, cityId } = request.body

        const city = await this.cityRepository.findOne({ where: { id: cityId } })

        const district = Object.assign(new District(), {
            name,
            city
        })

        return this.districtRepository.save(district);
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        const { name, cityId } = request.body

        const city = await this.cityRepository.findOne({ where: { id: cityId } })

        if (city)
            return this.districtRepository.update({ id }, { name, city })
        else
            return false
    }
}