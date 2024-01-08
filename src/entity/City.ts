import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from "typeorm"
import { Address } from "./Address"
import { District } from "./District"
import { Country } from "./Country"

@Entity({
    orderBy: {
        id: 'DESC'
    }
})
export class City {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => Country, (country) => country.id)
    @JoinColumn()
    country: Country

    @OneToMany(() => District, (district) => district.city)
    district: District

    @OneToMany(() => Address, (address) => address.city)
    address: Address
}
