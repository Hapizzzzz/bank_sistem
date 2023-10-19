const app = require('../../app');
const request = require('supertest');
let user = {};
let account = {};

describe('Test POST /api/v1/users endpoint', () => {
    test('Create a new user -> success', async () => {
        try {
            let name = 'usertest2';
            let email = 'usertest2@mail.com';
            let password = 'password123';

            let { statusCode, body } = await request(app)
                .post('/api/v1/users')
                .send({ name, email, password });
            user = body.data;

            expect(statusCode).toBe(201);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
        } catch (err) {
            expect(err).toBe('error');
        }
    });
});

describe('Test POST /api/v1/accounts endpoint', () => {
    test('Create a new account -> success', async () => {
        try {
            let bank_name = 'Test Bank';
            let bank_account_number = '1234567890';
            let balance = 1000;

            let { statusCode, body } = await request(app)
                .post('/api/v1/accounts')
                .send({
                    user_id: user.id,
                    bank_name,
                    bank_account_number,
                    balance,
                });
            account = body.data;

            expect(statusCode).toBe(201);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
        } catch (err) {
            expect(err).toBe('error');
        }
    });
});

describe('Test GET /api/v1/accounts/:accountID endpoint', () => {
    test('Retrieve account details -> success', async () => {
        try {
            let { statusCode, body } = await request(app).get(`/api/v1/accounts/${account.id}`);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
        } catch (err) {
            expect(err).toBe('error');
        }
    });
});

describe('Test PUT /api/v1/accounts/:accountID endpoint', () => {
    test('Update account details -> success', async () => {
        try {
            let updatedBankName = 'Updated Bank Name';
            let updatedBalance = 1500;

            let { statusCode, body } = await request(app)
                .put(`/api/v1/accounts/${account.id}`)
                .send({ bank_name: updatedBankName, balance: updatedBalance });

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
        } catch (err) {
            expect(err).toBe('error');
        }
    });
});

describe('Test DELETE /api/v1/accounts/:accountID endpoint', () => {
    test('Delete account -> success', async () => {
        try {
            let { statusCode, body } = await request(app).delete(`/api/v1/accounts/${account.id}`);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
        } catch (err) {
            expect(err).toBe('error');
        }
    });
});
