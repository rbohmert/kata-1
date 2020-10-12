const { gql } = require("apollo-server");

const typeDef = gql`
type Magazine {
    title: String
    isbn: String
    authors: String
    publishedAt: String
}
extend type Query {
    magazine(isbn: String!): Magazine
    magazines: [Magazine],
    magazinesExport: String
}
`;

module.exports = typeDef