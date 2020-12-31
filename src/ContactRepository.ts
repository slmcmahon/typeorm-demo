import { EntityRepository, Repository } from 'typeorm';
import { Contact } from './entity/Contact';

@EntityRepository(Contact)
export class ContactRepository extends Repository<Contact> {

    async createAndSave(contact: Contact): Promise<number> {
        let ct = new Contact();
        ct.lastName = contact.lastName;
        ct.firstName = contact.firstName;

        await this.save(ct);
        return ct.id;
    }

    async allcontacts(): Promise<Contact[]> {
        let contacts = await this.find();
        return contacts;
    }

    async findOneContact(id: number): Promise<Contact> {
        let contact = await this.findOne({ where: { id: id } });
        return contact;
    }

    async updateContact(id: number, contact: Contact): Promise<number> {
        if (!ContactRepository.isContactUpdater) {
            throw new Error(`Contact update id ${id} did not receive a Contact updater.`);
        }
        await this.manager.update(Contact, id, contact);
        return id;
    }

    async deleteContact(contact: number | Contact) {
        if (typeof contact !== 'number' && !ContactRepository.isContact(contact)) {
            throw new Error('Supplied contact object is not a Contact');
        }

        await this.manager.delete(Contact, typeof contact === 'number' ? contact : contact.id);
    }

    static isContact(contact: any): contact is Contact {
        return typeof contact === 'object'
            && typeof contact.lastName === 'string'
            && typeof contact.firstName === 'string';
    }

    static isContactUpdater(updater: any): boolean {
        let ret = true;

        if (typeof updater !== 'object') {
            throw new Error('isContactUpdater must receive an object.');
        }

        if (typeof updater.lastName !== 'undefined') {
            if (typeof updater.lastName !== 'string') {
                ret = false;
            }
        }

        if (typeof updater.lastName !== 'undefined') {
            if (typeof updater.lastName !== 'string') {
                ret = false;
            }
        }

        return ret;
    }
}