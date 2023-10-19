const app = require('../../app');
const request = require('supertest');
let user = {};

describe('Test POST /api/v1/users endpoint', () => {
    test('Test creating a new user with valid data -> success', async () => {
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
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('name');
            expect(body.data).toHaveProperty('email');
            expect(body.data).toHaveProperty('password');
            expect(body.data.name).toBe(name);
            expect(body.data.email).toBe(email);
            expect(body.data.password).toBe(password);
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test('Test creating a new user with an email that already exists -> error', async () => {
        try {
            let name = 'usertest2';
            let email = 'usertest2@mail.com';
            let password = 'password123';

            let { statusCode, body } = await request(app)
                .post('/api/v1/users')
                .send({ name, email, password });

            expect(statusCode).toBe(400);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
        } catch (err) {
            expect(err).toBe('email already in use');
        }
    });
});

describe('Test GET /api/v1/users/:id endpoint', () => {
    test('Test retrieving a user by their ID -> success', async () => {
        try {
            let { statusCode, body } = await request(app).get(`/api/v1/users/${user.id}`);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('name');
            expect(body.data).toHaveProperty('email');
            expect(body.data).toHaveProperty('password');
            expect(body.data.id).toBe(user.id);
            expect(body.data.name).toBe(user.name);
            expect(body.data.email).toBe(user.email);
            expect(body.data.password).toBe(user.password);
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test('Test retrieving a user with an ID that does not exist -> error', async () => {
        try {
            let { statusCode, body } = await request(app).get(`/api/v1/users/${user.id + 1000}`);

            expect(statusCode).toBe(400);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
        } catch (err) {
            expect(err).toBe('user not found');
        }
    });
});

describe('Test PUT /api/v1/users/:id endpoint', () => {
    test('Test updating a user with valid data -> success', async () => {
        try {
            let updatedName = 'usertest2-updated';
            let updatedEmail = 'usertest2-updated@mail.com';
            let updatedPassword = 'updated123';

            let { statusCode, body } = await request(app)
                .put(`/api/v1/users/${user.id}`)
                .send({ name: updatedName, email: updatedEmail, password: updatedPassword });

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('name');
            expect(body.data).toHaveProperty('email');
            expect(body.data).toHaveProperty('password');
            expect(body.data.id).toBe(user.id);
            expect(body.data.name).toBe(updatedName);
            expect(body.data.email).toBe(updatedEmail);
            expect(body.data.password).toBe(updatedPassword);
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test('Test updating a user with invalid data -> error', async () => {
        try {
            let invalidEmail = 'invalid-email';

            let { statusCode, body } = await request(app)
                .put(`/api/v1/users/${user.id}`)
                .send({ email: invalidEmail });

            expect(statusCode).toBe(400);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
        } catch (err) {
            expect(err).toBe('error');
        }
    });
});

describe('Test DELETE /api/v1/users/:id endpoint', () => {
    test('Test deleting a user with a valid ID -> success', async () => {
        try {
            let { statusCode, body } = await request(app).delete(`/api/v1/users/${user.id}`);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test('Test deleting a user with an ID that does not exist -> error', async () => {
        try {
            let { statusCode, body } = await request(app).delete(`/api/v1/users/${user.id}`);

            expect(statusCode).toBe(400);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
        } catch (err) {
            expect(err).toBe('error');
        }
    });
});
