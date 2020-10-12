const data = require('../utils/in-memory').data

const getInMemoryDao = () => {
    return {
        getBooks: () => data.books,
        getBook: (isbn) => data.books.find((b) => b.isbn === isbn),
        getBooksByAuthor: (author) => data.books.filter((b) => b.authors.split(',').includes(author)),
        getMagazines: () => data.magazines,
        getMagazine: (isbn) => data.magazines.find( (m) => m.isbn === isbn),
        getAuthors: () => data.authors,
        getAuthor: (email) => data.authors.find((a)=> a.email === email),
        insertBook: async (isbn, title, author, description) => {
            await data.books.push({isbn, title, author, description});
            return {isbn, title, author, description}
        }
    }
}

module.exports = getInMemoryDao