const app = require('./app')
const { createTestClient } = require('apollo-server-testing');
const { expect } = require("chai");

// Use CSVs in ./test/data for always have same data
describe('Query Tests', () => {
    let appTest;
    let query;
    this.timeout = 10000;

    before( async () => {
        appTest = await app('./test/data');
        query = createTestClient(appTest).query;
    })

    it('Should returns an array of 8 books that have title, isbn, authors and description', async () => {
        let queryBooks = {
            query: `{books {
                    isbn
                    title
                    authors
                    description
                }}`
        };
        const res = await query(queryBooks)
        expect(res.data.books).to.be.an("array");
        expect(res.data.books.length).equal(8)
        expect(res.data.books[0]).to.have.property('title')
        expect(res.data.books[0]).to.have.property('isbn')
        expect(res.data.books[0]).to.have.property('description')
        expect(res.data.books[0]).to.have.property('authors')
    })

    it('Should returns a book with isbn: 4545-8558-3232 that have title, isbn, authors and description', async () => {
        let queryBook = {
            query: `{ book(isbn: "4545-8558-3232") {
                    isbn
                    title
                    authors
                    description
                }}`
        };
        const res = await query(queryBook)
        expect(res.data.book.isbn).equal('4545-8558-3232')
        expect(res.data.book).to.have.property('title')
        expect(res.data.book).to.have.property('description')
        expect(res.data.book).to.have.property('authors')
    })

    it('Should return an array of 3 books with author: "null-lieblich@echocat.org"', async () => {
        let queryBooks = {
            query: `{booksByAuthor(author: "null-lieblich@echocat.org") {
                    isbn
                    title
                    authors
                    description
                }}`
        };
        const res = await query(queryBooks)
        expect(res.data.booksByAuthor).to.be.an("array");
        expect(res.data.booksByAuthor.length).equal(3)
        res.data.booksByAuthor.forEach((book) => expect(book.authors).to.have.string('null-lieblich@echocat.org'))
    })

    it('Should returns an array of 6 magazines that have title, isbn, authors and publishedAt', async () => {
        let queryMags = {
            query: `{magazines {
                    isbn
                    title
                    authors
                    publishedAt
                }}`
        };
        const res = await query(queryMags)
        expect(res.data.magazines).to.be.an("array");
        expect(res.data.magazines.length).equal(6)
        expect(res.data.magazines[0]).to.have.property('title')
        expect(res.data.magazines[0]).to.have.property('isbn')
        expect(res.data.magazines[0]).to.have.property('publishedAt')
        expect(res.data.magazines[0]).to.have.property('authors')
    })

    it('Should return a magazine with isbn: 2365-8745-7854 that have title, isbn, authors and publishedAt', async () => {
        let queryBooks = {
            query: `{magazine(isbn: "2365-8745-7854") {
                    isbn
                    title
                    authors
                    publishedAt
                }}`
        };
        const res = await query(queryBooks)
        expect(res.data.magazine.isbn).equal('2365-8745-7854')
        expect(res.data.magazine).to.have.property('title')
        expect(res.data.magazine).to.have.property('publishedAt')
        expect(res.data.magazine).to.have.property('authors')
    })

    it('Should returns an array of 6 authors that have email, firstname, lastname', async () => {
        let queryBooks = {
            query: `{authors {
                    email
                    firstname
                    lastname
                }}`
        };
        const res = await query(queryBooks)
        expect(res.data.authors).to.be.an("array");
        expect(res.data.authors.length).equal(6)
        expect(res.data.authors[0]).to.have.property('email')
        expect(res.data.authors[0]).to.have.property('firstname')
        expect(res.data.authors[0]).to.have.property('lastname')
    })

    it('Should return an author with email: null-gustafsson@echocat.org that have email, firstname, lastname', async () => {
        let queryBooks = {
            query: `{author(email: "null-gustafsson@echocat.org") {
                    email
                    firstname
                    lastname
                }}`
        };
        const res = await query(queryBooks)
        expect(res.data.author.email).equal('null-gustafsson@echocat.org')
        expect(res.data.author).to.have.property('firstname')
        expect(res.data.author).to.have.property('lastname')
    })
})