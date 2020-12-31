import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Contact } from './Contact';

@Entity()
export class Address {
    @PrimaryGeneratedColumn() id: number;
    @Column() street1: string;
    @Column({ nullable: true }) street2: string;
    @Column() city: string;
    @Column() state: string;
    @Column({ nullable: true }) postalCode: string;
    @Column({ nullable: true }) primaryPhone: string;
    @Column({ nullable: true }) secondaryPhone: string;
    @Column({ nullable: true }) email: string;
    @ManyToOne(() => Contact, contact => contact.addresses)
    contact: Contact;
}