//TODO Create better mock resolvers to enable a more intuitive mock graphql return.

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// eslint-disable-next-line
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import gql from 'graphql-tag';
import { ApolloProvider, graphql } from 'react-apollo';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import { typeDefs } from './schema';
import mocks from './mocks'


const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema, mocks });

//Mocking client

const client = new ApolloClient({
  link: new SchemaLink({ schema }),
  cache: new InMemoryCache(),
});

/*
When you have a server setup, replace the above client with the following to test your server.

const client = new ApolloClient({
  link: new HttpLink({ uri: 'YOUR_SERVER_API' }),
  cache: new InMemoryCache()
});

 */

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <PropsDisplayerWithData />
        </div>
      </ApolloProvider>
    );
  }
}

const PropsDisplayer = data => <div><pre style={{textAlign: 'left'}} dangerouslySetInnerHTML={{__html: JSON.stringify(data, undefined, 2) }} /></div>;

const itemsQuery = gql`
  query ItemsListQuery {
    list {
      id
      name
        tags
        description
        status
        pricePerDay {
            amount
            currency
        }
        pricePerHire {
            amount
            currency
        }
        geolocation
    }
  }
`;

const PropsDisplayerWithData = graphql(itemsQuery)(PropsDisplayer);

export default App;
