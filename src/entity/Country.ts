import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from "typeorm"
import { Address } from "./Address"
import { City } from "./City"

@Entity()
export class Country {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => City, (city) => city.country)
    city: City

    @OneToMany(() => Address, (address) => address.country)
    address: Address
}
