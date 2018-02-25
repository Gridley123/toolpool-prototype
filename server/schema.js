import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

const typeDefs = `
type Broadcaster {
  id: ID!
  name: String
  terrestrial: Boolean!
}
type Channel {
  id: ID!
  name: String
  broadcasters: [Broadcaster!]!
}
type Query {
  channels: [Channel]
}
`;

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });
export { schema };