const assert = require('chai').assert;
const {
    connect,
    connected,
    getContactRepository,
    Contact,
    Address
} = require('../dist/index');

describe('Initialize Contact Manager', () => {
    before(async () => {
        try {
            await connect({
                database: "typeormdemo",
                username: "typeormuser",
                password: "Qcijb-fe4k-vD6Bo9deYOw",
                synchronize: true,
                dropSchema: true,
                entities: [Contact, Address]
            });
        } catch (e) {
            console.error(`Initialize failed wiht ${e}`);
            throw e;
        }
    });
    it('should successfully initialize the Contact Manager', async () => {
        assert.isTrue(connected());
    });
});

let c1 = {
    lastName: "Person",
    firstName: "Jone"
};
let c2 = {
    lastName: "Person",
    firstName: "Jane"
}

describe('Add contact to repository', () => {
    let contactId1;
    let contactId2;

    it('should add two new contacts', async () => {
        contactId1 = await getContactRepository().createAndSave(c1);
        contactId2 = await getContactRepository().createAndSave(c2);

        let contact1 = await getContactRepository().findOneContact(contactId1);
        let contact2 = await getContactRepository().findOneContact(contactId2);
        assert.exists(contact1);
        assert.exists(contact2);

        assert.isObject(contact1);
        assert.isObject(contact2);

        assert.isString(contact1.lastName);
        assert.isString(contact2.lastName);

        assert.equal(contact1.lastName, c1.lastName);
        assert.equal(contact2.lastName, c2.lastName);

        assert.isString(contact1.firstName);
        assert.isString(contact2.firstName);

        assert.equal(contact1.firstName, c1.firstName);
        assert.equal(contact2.firstName, c2.firstName);
    });
});

describe('List all contacts in the database', () => {
    it('should find two contacts in the database', async () => {
        let contacts = await getContactRepository().allcontacts();
        assert.equal(contacts.length, 2);
    });
});

describe('Update contact in repository', () => {
    it('should update a contact in the manager', async () => {
        let id = 1;
        let newName = 'David';

        let contact = await getContactRepository().findOneContact(id);
        assert.exists(contact);
        assert.isObject(contact);

        let updater = {
            lastName: contact.lastName,
            firstName: newName
        };

        let result = await getContactRepository().updateContact(id, updater);
        assert.equal(id, result);

        let updated = await getContactRepository().findOneContact(id);
        assert.equal(updated.firstName, newName);
    });
});

describe('Delete contact from repository', () => {
    it('should remove a contact from the repository by ID', async () => {
        let id = 1;
        await getContactRepository().deleteContact(id);

        let contact = await getContactRepository().findOneContact(id);
        assert.isNotObject(contact);
    })
    it('should remove a contact from the repository by object', async () => {
        c2.id = 2
        await getContactRepository().deleteContact(c2);

        let contact = await getContactRepository().findOneContact(c2.id);
        assert.isNotObject(contact);
    });
});