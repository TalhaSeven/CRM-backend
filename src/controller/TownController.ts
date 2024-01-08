import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Town } from "../entity/Town"
import { District } from "../entity/District"

export class TownController {

    private townRepository = AppDataSource.getRepository(Town)
    private districtRepository = AppDataSource.getRepository(District)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.townRepository.find({ relations: { district: true } })
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { name, districtId } = request.body;

        const district = await this.districtRepository.findOne({ where: { id: districtId } });

        const town = Object.assign(new District(), {
            name,
            district
        })

        return this.townRepository.save(town)
    }

    async update(request: Request, response: Request, next: NextFunction) {
        const id = parseInt(request.params.id)
        const { name, districtId } = request.body

        const district = await this.districtRepository.findOne({ where: { id: districtId } })

        if (district)
            return this.townRepository.update({ id }, { name, district })
        else
            return false
    }
}