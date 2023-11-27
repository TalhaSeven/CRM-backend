import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Address } from "../entity/Address";

export class AddressController {
  private addressRepository = AppDataSource.getRepository(Address);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.addressRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const address = await this.addressRepository.findOne({
      where: { id },
    });
    if (!address) {
      return "unregistered address";
    }
    return address;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const {  } = request.body;
    const address = Object.assign(new Address(), {

    });
    return this.addressRepository.save(address);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const {  } = request.body;
    return this.addressRepository.update(
      { id },
      {

      }
    );
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    let addressToRemove = await this.addressRepository.findOneBy({ id });
    if (!addressToRemove) {
      return "this address not exist";
    }
    await this.addressRepository.remove(addressToRemove);
    return "address has been removed";
  }
}
