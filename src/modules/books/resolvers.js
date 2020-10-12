const getDao = require('../../data').getDao
const csvExport = require('../../utils/export')

module.exports = {
    Query : {
        books: (_, {}, context) => getDao().getBooks(),
        book: (_, { isbn }, context) => getDao().getBook(isbn),
        booksByAuthor: (_, {author}, context) => getDao().getBooksByAuthor(author),
        booksExport: (_, {}, context) => csvExport(getDao().getBooks(), 'books'),

},
    Mutation: {
        addBook: (_, { isbn, title, author, description }, context) => getDao().insertBook(isbn, title, author, description)
    }
};