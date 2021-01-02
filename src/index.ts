import 'reflect-metadata';
import { Customer } from './entity/Customer';
export { Customer } from './entity/Customer';
import { Invoice } from './entity/Invoice';
export { Invoice } from './entity/Invoice';
import { InvoiceItem } from './entity/InvoiceItem'
export { InvoiceItem } from './entity/InvoiceItem'
import { CustomerRepository } from './CustomerRepository';
export { CustomerRepository } from './CustomerRepository';
import { InvoiceRepository } from './InvoiceRepository';
export { InvoiceRepository } from './InvoiceRepository';
import { InvoiceItemRepository } from './InvoiceItemRepository';
export { InvoiceItemRepository } from './InvoiceItemRepository';
import { createConnection, Connection } from 'typeorm';

let _connection: Connection;

export async function connect(config: any) {
    _connection = await createConnection(config);
}

export function connected() {
    return typeof _connection !== 'undefined';
}

export function getCustomerRepository(): CustomerRepository {
    let repo = _connection.getCustomRepository(CustomerRepository);
    return repo;
}

export function getInvoiceRepository(): InvoiceRepository {
    let repo = _connection.getCustomRepository(InvoiceRepository);
    return repo;
}

export function getInvoiceItemRepository(): InvoiceItemRepository {
    let repo = _connection.getCustomRepository(InvoiceItemRepository);
    return repo;
}