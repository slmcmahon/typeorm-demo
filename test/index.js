const assert = require('chai').assert;
const {
    connect,
    connected,
    getCustomerRepository,
    getInvoiceRepository,
    getInvoiceItemRepository,
    Customer,
    Invoice,
    InvoiceItem,
    InvoiceRepository,
    InvoiceItemRepository,
} = require('../dist/index');

describe('Initialize Contact Manager', () => {
    before(async () => {
        try {
            await connect({
                type: "mssql",
                database: "typeormdemo",
                host: "localhost",
                username: "typeormuser",
                password: "Qcijb-fe4k-vD6Bo9deYOw",
                port: 1433,
                synchronize: true,
                dropSchema: true,
                logging: false,
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

let cust1 = {
    name: "Big Company",
    street: "1 Wall Street",
    city: "New York",
    state: "NY",
    postalCode: "10004",
    phone: "917 555 5555",
    contactName: "John Q. Public"
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


let inv1 = {
    invoicedOn: new Date(2021, 1, 1),
    customerInvNumber: 'DZ-015',
    due: new Date(2021, 2, 1),
    total: 100,
    balance: 100
};

let inv2 = {
    invoicedOn: new Date(2021, 1, 1),
    customerInvNumber: '27B/6',
    due: new Date(2021, 2, 1),
    total: 100,
    balance: 100
};

let invItem1 = {
    quantity: 100,
    price: 20,
    description: 'widgets'
};

let invItem2 = {
    quantity: 200,
    price: 10,
    description: 'framises'
}

describe('Test entity relationships', () => {
    let customerId1;
    let customerId2;
    let customer1;
    let invoiceId1;
    let invoiceId2;
    let invoice1;
    let invoice2;

    it('should create two new customer records', async () => {
        customerId1 = await getCustomerRepository().createAndSave(cust1);
        customerId2 = await getCustomerRepository().createAndSave(cust2);

        customer1 = await getCustomerRepository().findOneCustomer(customerId1);
        await getCustomerRepository().findOneCustomer(customerId2);

        assert.exists(customer1);
        assert.isObject(customer1, 'customer1 is an object');
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

        let customers = await getCustomerRepository().allCustomers();
        assert.equal(2, customers.length);
    });
    it('Should add two invoices', async () => {
        invoiceId1 = await getInvoiceRepository().createAndSave(inv1, customer1);
        invoiceId2 = await getInvoiceRepository().createAndSave(inv2, customer1);

        invoice1 = await getInvoiceRepository().findOneInvoice(invoiceId1);
        await getInvoiceRepository().findOneInvoice(invoiceId2);

        assert.exists(invoice1);
        assert.isObject(invoice1);
        assert.isString(invoice1.customerInvNumber);
        assert.equal(invoice1.customerInvNumber, inv1.customerInvNumber);
        assert.instanceOf(invoice1.invoicedOn, Date);
        //assert.equal(invoice1.invoicedOn, new Date(2021, 1, 1));
        assert.instanceOf(invoice1.due, Date);
        //assert.equal(invoice1.due, new Date(2021, 2, 1));
        assert.isNumber(invoice1.total);
        assert.equal(invoice1.total, inv1.total);
        assert.isNumber(invoice1.balance);
        assert.equal(invoice1.balance, inv1.balance);
    });
    it('Should find two invoices attached to customer', async () => {
        let cust = await getCustomerRepository().findOneCustomer(customerId1, true);
        assert.exists(cust.invoices);
        assert.isArray(cust.invoices);
        assert.equal(cust.invoices.length, 2);
    });
    it('Should add two invoice items', async () => {
        let i1 = await getInvoiceRepository().findOneInvoice(invoiceId1);
        await getInvoiceItemRepository().createAndSave(invItem1, i1);
        await getInvoiceItemRepository().createAndSave(invItem2, i1);

        let i = await getInvoiceRepository().findOneInvoice(invoiceId1);
        assert.exists(i);
        assert.isObject(i);
        assert.exists(i.items);
        assert.isArray(i.items);
        assert.equal(2, i.items.length);
    });
    it('Should find a customer for a given invoice', async () => {
        let i = await getInvoiceRepository().findOneInvoice(invoiceId1);
        assert.exists(i);
        assert.isObject(i);
        assert.exists(i.customer);
        assert.isObject(i.customer);
        assert.equal(i.customer.name, cust1.name);
        assert.equal(i.customer.phone, cust1.phone);
        assert.equal(i.customer.postalCode, cust1.postalCode);
        assert.equal(i.customer.street, cust1.street);
        assert.equal(i.customer.state, cust1.state);
    });
});
