const {ApolloServer, gql} = require('apollo-server');
const initData = require("./data").initData;
const magazineTypeDef = require('./modules/magazines/typeDef');
const magazineResolvers = require('./modules/magazines/resolvers');
const bookTypeDef = require('./modules/books/typeDef');
const bookResolvers = require('./modules/books/resolvers');
const authorTypeDef = require('./modules/authors/typeDef');
const authorResolvers = require('./modules/authors/resolvers');

const typeDef = gql`
  type Query
  type Mutation
`;

const app = async (dataDirectory) => {
  await initData(dataDirectory);

  const server = new ApolloServer({
      typeDefs: [typeDef, magazineTypeDef, bookTypeDef, authorTypeDef],
      resolvers: [magazineResolvers, bookResolvers, authorResolvers]
  });

  await server.listen(4200);
  console.log(`Success server connection on port 4200`)

  return server;
}

module.exports = app
