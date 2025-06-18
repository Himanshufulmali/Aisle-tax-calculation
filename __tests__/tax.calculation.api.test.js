const request = require('supertest');
const { app } = require('../configs/server-config'); 

process.env.SALES_TAX = '10';
process.env.IMPORT_TAX = '5';
process.env.EXCLUDE_CATEGORIES = 'food,medical,books';
process.env.PORT = '3001'; 

describe('API: /api/v1/tax-calculation', () => {

    // Test for the GET endpoint
    it('GET /api/v1/tax-calculation should return a welcome message', async () => {
        const res = await request(app).get('/api/v1/tax-calculation');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ message: 'Welcome To Product Tax Calculation' });
    });

    // Test for POST endpoint
    describe('POST /api/v1/tax-calculation', () => {

        // With mixed products
        it('should correctly calculate taxes for mixed products', async () => {
            const products = [
                { category: 'books', name: 'The Hobbit', price: 12.49, quantity: 1, isImported: false },
                { category: 'music', name: 'CD Player', price: 14.99, quantity: 1, isImported: false },
                { category: 'perfume', name: 'Perfume', price: 47.50, quantity: 1, isImported: true }
            ];

            const res = await request(app)
                .post('/api/v1/tax-calculation')
                .send({ products });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toEqual([
                '1 The Hobbit: 12.49',
                '1 CD Player: 16.49',
                '1 imported Perfume: 54.65',
                'Sales taxes: 8.65',
                'Total: 83.63'
            ]);
        });

        // Products with no taxes
        it('should calculate zero taxes for tax excluded, non-imported products', async () => {
            const products = [
                { category: 'food', name: 'Pizza', price: 10.00, quantity: 1, isImported: false },
                { category: 'medical', name: 'Pain Relief', price: 5.00, quantity: 2, isImported: false },
            ];

            const res = await request(app)
                .post('/api/v1/tax-calculation')
                .send({ products });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toEqual([
                '1 Pizza: 10.00',
                '2 Pain Relief: 10.00',
                'Sales taxes: 0.00',
                'Total: 20.00'
            ]);
        });

        // Only imported, tax-excluded products
        it('should only apply import tax to imported tax excluded products', async () => {
            const products = [
                { category: 'food', name: 'Chocolate', price: 10.00, quantity: 1, isImported: true },
            ];

            const res = await request(app)
                .post('/api/v1/tax-calculation')
                .send({ products });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toEqual([
                '1 imported Chocolate: 10.50',
                'Sales taxes: 0.50',
                'Total: 10.50'
            ]);
        });

        // Missing products array in request body
        it('should return an error if products array is missing from body', async () => {
            const res = await request(app)
                .post('/api/v1/tax-calculation')
                .send({}); 

            expect(res.statusCode).toEqual(201);
            expect(res.body).toEqual({ error: 'Please check the input fields' });
        });

        // Invalid product data 
        it('should return an error for invalid product data', async () => {
            const products = [
                { category: 'electronics', name: 'Broken Item', price: -5.00, quantity: 1, isImported: false }
            ];

            const res = await request(app)
                .post('/api/v1/tax-calculation')
                .send({ products });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toEqual({ error: 'Please check the input fields' });
        });
    });
});