const request = require('supertest');
const app = require('../app');

describe('Docker CI/CD Lab API Tests', () => {

    test('GET / should return application information', async () => {
        const response = await request(app).get('/');

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Docker CI/CD Lab Application');
        expect(response.body.status).toBe('Running');
    });

    test('GET /health should return healthy status', async () => {
        const response = await request(app).get('/health');

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('healthy');
        expect(response.body.timestamp).toBeDefined();
    });

    test('GET /api/users should return three users', async () => {
        const response = await request(app).get('/api/users');

        expect(response.statusCode).toBe(200);
        expect(response.body.users).toHaveLength(3);
        expect(response.body.users[0].name).toBe('Alice');
    });

});
