//TODO Create better mock resolvers to enable a more intuitive mock graphql return.

import React, {Component} from 'react';
import logo from './crossSpanner.svg';
import './App.css';
import CreateItemForm from './Pages/CreateItem';
import ListItems from './Pages/ListItems';
import ListTags from './Pages/ListTags'
import Item from './Pages/Item';
import EditItem from './Pages/EditItem';
// eslint-disable-next-line
import {ApolloClient, InMemoryCache} from 'apollo-client-preset';
import {HttpLink} from "apollo-link-http";
// import gql from 'graphql-tag';
import {ApolloProvider} from 'react-apollo';
// import {addResolveFunctionsToSchema, makeExecutableSchema} from 'graphql-tools';
import {Link, Route} from 'react-router-dom';
import {Menu} from 'semantic-ui-react';
// import resolverMap from './mocks/resolverMap';
// import {typeDefs} from './schema';

const itemData = {
  "listItems": [
    {
      "id": "1",
      "name": "Sledgehammer",
      "status": "PUBLISHED",
      "description": "For smashing stuff up",
      "tags": [
        {
          "id": "1",
          "name": "hammer"
        },
        {
          "id": "2",
          "name": "building"
        }
      ],
      "pricePerHire": {
        "amount": 10,
        "currency": "GBP"
      },
      "pricePerDay": {
        "amount": 5,
        "currency": "GBP"
      },
      "deposit":
        {
          "amount": 20,
          "currency": "GBP"
        },
      "geolocation": {
        "lat": 37.4224764,
        "lng": -122.0842499
      },
      "bookings": [
        {
          "id": "3"
        }
      ]
    },
    {
      "id": "2",
      "name": "Spanner",
      "status": "DRAFT",
      "description": "For tightening things",
      "tags": [
        {
          "id": "3",
          "name": "metalwork"
        }
      ],
      "pricePerHire": {
        "amount": 8,
        "currency": "GBP"
      },
      "pricePerDay": {
        "amount": 3,
        "currency": "GBP"
      },
      "deposit":
        {
          "amount": 20,
          "currency": "GBP"
        },
      "geolocation": {
        "lat": 45.4224764,
        "lng": -110.0842499
      },
      "bookings": [
        {
          "id": "1"
        }
      ]
    },
    {
      "id": "3",
      "name": "Vice",
      "status": "DISABLED",
      "description": "For securing things",
      "tags": [
        {
          "id": "3",
          "name": "metalwork"
        }
      ],
      "pricePerHire": {
        "amount": 15,
        "currency": "GBP"
      },
      "pricePerDay": {
        "amount": 19,
        "currency": "GBP"
      },
      "deposit":
        {
          "amount": 20,
          "currency": "GBP"
        },
      "geolocation": {
        "lat": 10.4224764,
        "lng": -111.0842499
      },
      "bookings": [
        {
          "id": "2"
        }
      ]
    }
  ]
};

// let uri = 'http://localhost:8080/graphql';
//
// if(process.env.NODE_ENV === 'production') {
//   uri = `https://toolpool-193609.appspot.com/graphql`;
// }

let uri = `https://toolpool-193609.appspot.com/graphql`;

const client = new ApolloClient({
  link: new HttpLink({ uri, }),
  cache: new InMemoryCache()
});



class App extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">ToolPool</h1>
          </header>
          <div className={"App-body"}>
            <Menu inverted fluid style={{marginBottom:"25px", borderRadius: 0}}>
              <Menu.Item>
                <Link to={"/create-item"}>Create Item</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={"/items"}>List Items</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={"/tags"}>List Tags</Link>
              </Menu.Item>
            </Menu>
            <div>
              <Route path={"/create-item"} component={CreateItemForm}/>
              <Route exact path={"/items"} itemData={itemData} render={props => <ListItems {...props} />}/>
              <Route path={"/tags"} render={props => <ListTags{...props} />}/>
              <Route exact path={"/items/:id"} render={props => <Item {...props} />}/>
              <Route path={"/items/:id/edit"} render={props => <EditItem {...props} />}/>

            </div>
          </div>
        </div>
      </ApolloProvider>
    );
  }
}


//Create Item Fragment


export default App;
