import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Invoice } from './Invoice';

@Entity()
export class InvoiceItem {
    @PrimaryGeneratedColumn() id: number;
    @ManyToOne(() => Invoice, invoice => invoice.items)
    invoice: Invoice;
}