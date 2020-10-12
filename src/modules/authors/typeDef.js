const { gql } = require("apollo-server");

const typeDef = gql`
type Author {
    email: String
    firstname: String
    lastname: String
}
extend type Query {
    author(email: String!): Author
    authors: [Author]
    authorsExport: String
}
`;

module.exports = typeDef