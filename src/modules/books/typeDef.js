const { gql } = require("apollo-server");

const typeDef = gql`
type Book {
    title: String
    isbn: String
    authors: String
    description: String
}
extend type Query {
    book(isbn: String!): Book
    books: [Book]
    booksByAuthor(author: String!): [Book]
    booksExport: String
}
extend type Mutation {
    addBook(isbn: String!, title: String!, author: String!, description: String): Book
}
`;

module.exports = typeDef