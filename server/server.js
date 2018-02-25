import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import resolverMap from './resolverMap';
import {makeExecutableSchema, addResolveFunctionsToSchema} from 'graphql-tools';
const cors = require('cors')

import {typeDefs} from './schema';

const schema = makeExecutableSchema({ typeDefs });
addResolveFunctionsToSchema(schema, resolverMap);

const PORT = 4000;

const server = express();

server.use(cors());

server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));


server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));


server.listen(PORT, () => console.log(`GraphQL Server is now running on http://localhost:${PORT}`));
