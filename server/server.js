import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import resolverMap from './resolverMap';
import {makeExecutableSchema, addResolveFunctionsToSchema} from 'graphql-tools';
const cors = require('cors')

import {typeDefs} from './schema';

const schema = makeExecutableSchema({ typeDefs });
addResolveFunctionsToSchema(schema, resolverMap);


  const PORT = 8080;


const app = express();

app.use(cors());

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));


app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));



const server = app.listen(PORT, () => {

  let host = server.address().address;
  if(host === '::') host = 'localhost';
  const serverport = server.address().port;
  console.log(`GraphQL Server is now running on http://${host}:${serverport}`)}
);
