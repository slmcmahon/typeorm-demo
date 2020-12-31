import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './Address';

@Entity()
export class Contact {
    @PrimaryGeneratedColumn() id: number;
    @Column() lastName: string;
    @Column() firstName: string;
    @OneToMany(() => Address, address => address.contact)
    addresses: Address[];
}