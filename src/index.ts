import 'reflect-metadata';

import { Contact } from './entity/Contact';
export { Contact } from './entity/Contact';
import { Address } from './entity/Address';
export { Address } from './entity/Address';
import { ContactRepository } from './ContactRepository';
export { ContactRepository } from './ContactRepository';
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

export function getContactRepository(): ContactRepository {
    let repo = _connection.getCustomRepository(ContactRepository);
    return repo;
}