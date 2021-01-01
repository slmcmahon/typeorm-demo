const assert = require('chai').assert;
const {
    connect,
    connected,
    getCustomerRepository,
    Customer,
    Invoice,
    InvoiceItem
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
                entities: [Customer, Invoice, InvoiceItem]
            });
        } catch (e) {
            console.error(`Initialize failed with ${e}`);
            throw e;
        }
    });
    it('should successfully initialize the Customer Manager', async () => {
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
};

let cust1 = {
    name: "Big Company",
    street: "1 Wall Street",
    city: "New York",
    state: "NY",
    postalCode: "10004",
    phone: "917 555 5555",
    contactName: "Ezra Goldstein"
};

let cust2 = {
    name: "Small Company",
    street: "123 Main St.",
    city: "Tenaha",
    state: "TX",
    postalCode: "75974",
    phone: "BR549",
    contactName: "Billy Ray Jackson"
};

describe('Add customer to database', () => {
    let customerId1;
    let customerId2;

    it('should add two new customers', async () => {
        customerId1 = await getCustomerRepository().createAndSave(cust1);
        customerId2 = await getCustomerRepository().createAndSave(cust2);

        let customer1 = await getCustomerRepository().findOneCustomer(customerId1);
        let customer2 = await getCustomerRepository().findOneCustomer(customerId2);

        assert.exists(customer1);
        assert.isObject(customer1);
        assert.isString(customer1.name);
        assert.equal(cust1.name, customer1.name);
        assert.isString(customer1.street);
        assert.equal(cust1.street, customer1.street);
        assert.isString(customer1.city);
        assert.equal(cust1.city, customer1.city);
        assert.isString(customer1.state);
        assert.equal(cust1.state, customer1.state);
        assert.isString(customer1.postalCode);
        assert.equal(cust1.postalCode, customer1.postalCode);
        assert.isString(customer1.phone);
        assert.equal(cust1.phone, customer1.phone);
        assert.isString(customer1.contactName);
        assert.equal(cust1.contactName, customer1.contactName);

        assert.exists(customer2);
        assert.isObject(customer2);
        assert.isString(customer2.name);
        assert.equal(cust2.name, customer2.name);
        assert.isString(customer2.street);
        assert.equal(cust2.street, customer2.street);
        assert.isString(customer2.city);
        assert.equal(cust2.city, customer2.city);
        assert.isString(customer2.state);
        assert.equal(cust2.state, customer2.state);
        assert.isString(customer2.postalCode);
        assert.equal(cust2.postalCode, customer2.postalCode);
        assert.isString(customer2.phone);
        assert.equal(cust2.phone, customer2.phone);
        assert.isString(customer2.contactName);
        assert.equal(cust2.contactName, customer2.contactName);
    });
});

describe('List all customers in the database', () => {
    it('should find two contacts in the database', async () => {
        let customers = await getCustomerRepository().allCustomers();
        assert.equal(customers.length, 2);
    });
});

describe('Update a contact in the database', () => {
    it('should update a contact', async () => {
        let id = 1;
        let newName = 'Big Corporation';

        let customer = await getCustomerRepository().findOneCustomer(id);
        assert.exists(customer);
        assert.isObject(customer);

        let updater = {
            name: newName,
            street: customer.street,
            city: customer.city,
            state: customer.state,
            postalCode: customer.postalCode,
            phone: customer.phone,
            contactName: customer.contactName
        };

        let result = await getCustomerRepository().updateCustomer(id, updater);
        assert.equal(id, result);

        let updated = await getCustomerRepository().findOneCustomer(id);
        assert.equal(updated.name, newName);
    });
});

describe('Delete customer', () => {
    it('should remove a customer by ID', async () => {
        let id = 1;
        await getCustomerRepository().deleteCustomer(id);

        try {
            await getCustomerRepository().findOneCustomer(id);
        } catch (e) {
            assert.equal(`No Customer was found for id: ${id}.`, e.message);
        }
    });
    it('should remove a customer by object', async () => {
        cust2.id = 2;
        await getCustomerRepository().deleteCustomer(cust2);

        try {
            await getCustomerRepository().findOneCustomer(cust2.id);
        } catch (e) {
            assert.equal(`No Customer was found for id: ${cust2.id}.`, e.message);
        }
    });
});
