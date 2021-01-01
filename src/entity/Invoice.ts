import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './Customer';
import { InvoiceItem } from './InvoiceItem';

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn() id: number;
    @Column("datetime2") invoicedOn: string;
    @Column("datetime2") due: string;
    @Column("decimal") total: number;
    @Column("decimal") balance: number;
    @ManyToOne(() => Customer, customer => customer.invoices)
    customer: Customer;
    @OneToMany(() => InvoiceItem, invoiceItem => invoiceItem.invoice)
    items: InvoiceItem[];
}