import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Town } from "../entity/Town"
import { Like } from "typeorm"

export class SearchController {

    private townRepository = AppDataSource.getRepository(Town)

    async all(request: Request, response: Response, next: NextFunction) {
        const search = request.query['search'] as string

        const list = this.townRepository.find({
            where: [
                { name: Like(`%${search}%`) },
                {
                    district: {
                        name: Like(`%${search}%`),
                    }
                },
                {
                    district: {
                        city: { name: Like(`%${search}%`) }
                    }
                },
                {
                    district: {
                        city: { country: { name: Like(`%${search}%`) } }
                    }
                },
            ],
            relations: {
                district: { city: { country: true } }
            }
        })

        // return list

        return (await list).map((k: any) => {
            return {
                townId: k.id,
                townName: k.name,
                districtId: k.district.id,
                districtName: k.district.name,
                cityId: k.district.city.id,
                cityName: k.district.city.name,
                countryId: k.district.city.country.id,
                countryName: k.district.city.country.name
            }
        })
    }
}