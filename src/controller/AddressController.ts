import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Address } from "../entity/Address"
import { AddressModel } from "../model/AddressModel"

export class AddressController {
    private addressRepository = AppDataSource.getRepository(Address)

    async all(request: Request, response: Response, next: NextFunction) {
        const addresses: AddressModel[] = await this.addressRepository.find({
            relations: { user: true },
            select: {
                id: true,
                addressType: true,
                addressLine: true,
                location: true,
                user: { id: true, firstName: true, lastName: true }
            }
        })

        return { data: addresses, status: true }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        const address = await this.addressRepository.findOne({
            where: { id },
            relations: { user: true },
            select: {
                id: true,
                addressType: true,
                addressLine: true,
                location: true,
                user: { id: true, firstName: true, lastName: true }
            }
        })

        if (!address) {
            return { message: "unregistered address", status: false }
        }
        return { data: address, status: true }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { userId, addressType, addressLine, location } = request.body;

        const address = Object.assign(new Address(), {
            user: userId,
            addressType,
            addressLine,
            location
        })

        try {
            const insert = await this.addressRepository.save(address)
            return { data: insert, status: true }
        } catch (error) {
            next({ error, status: false })
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        const { userId, addressType, addressLine, location } = request.body;

        try {
            const update = await this.addressRepository.update({ id }, {
                user: userId,
                addressType,
                addressLine,
                location
            })
            return { data: update, status: update.affected > 0 }
        } catch (error) {
            next({ error, status: 404 })
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        let addressToRemove = await this.addressRepository.findOneBy({ id })

        if (!addressToRemove) {
            return { message: "this address not exist", status: false }
        }
        await this.addressRepository.remove(addressToRemove)
        return { message: "address has been removed", status: true }
    }
}