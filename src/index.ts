import 'reflect-metadata';
import { Customer } from './entity/Customer';
export { Customer } from './entity/Customer';
import { Invoice } from './entity/Invoice';
export { Invoice } from './entity/Invoice';
import { InvoiceItem } from './entity/InvoiceItem'
export { InvoiceItem } from './entity/InvoiceItem'
import { CustomerRepository } from './CustomerRepository';
export { CustomerRepository } from './CustomerRepository';
import { createConnection, Connection } from 'typeorm';

let _connection: Connection;

export async function connect(config: any) {
    _connection = await createConnection({
        type: config.type || "mssql",
        database: config.database,
        host: config.host || "localhost",
        username: config.username,
        password: config.password,
        port: config.port || 1433,
        logging: config.logging || false,
        synchronize: config.synchronize || false,
        dropSchema: config.dropSchema || false,
        entities: config.entities
    });
}

export function connected() {
    return typeof _connection !== 'undefined';
}

export function getCustomerRepository(): CustomerRepository {
    let repo = _connection.getCustomRepository(CustomerRepository);
    return repo;
}