process.env.NODE_ENV = "test";

const request = require('supertest')
const app = require("../app");
const db = require('../db')

let testBook = {
    isbn: "0691161518",
    amazon_url: "http://a.co/eobPtX2",
    author: "Matthew Lane",
    language: "english",
    pages: 264,
    publisher: "Princeton University Press",
    title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
    year: 2017
  };


afterEach(async () => {
    await db.query(`DELETE FROM books`);
})


describe('/GET /books', () => {
    test('Gets all books', async () => {
        const res = await request(app).get('/books');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({books: [testBook]})
    });

    test('Gets books based on isbn', async () => {
        const res = await request(app).get(`/books/${testBook.isbn}`)
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({book: {testBook}});
    });
});

describe('POST /books', () => {
    test('Create new book', async () => {
        const res = await request(app).post('/books').send(testBook);
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ book: {testBook}});
    })
})

describe('PUT /books/:isbn', () => {
    test('Updates a book', async () => {
        const res = await request(app).put(`/companies/${testBook.isbn}`).send({
            author: "testAuthor"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({book: {
            isbn: "0691161518",
            amazon_url: "http://a.co/eobPtX2",
            author: "testAuthor",
            language: "english",
            pages: 264,
            publisher: "Princeton University Press",
            title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
            year: 2017
          }})
    });
    test('Responds with 404 for invalid name', async () => {
        const res = await request(app).patch(`/books/test`).send({name:'test'})
        expect(res.statusCode).toBe(404);
    });
});

afterAll(async () => {
    await db.end()
});