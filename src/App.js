//TODO Create better mock resolvers to enable a more intuitive mock graphql return.

import React, {Component} from 'react';
import logo from './images/crossSpanner.svg';
import background from './images/toolPoolBg.jpg';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import CreateItemForm from './Pages/CreateItem';
import SignIn from './Pages/SignIn';
import ListItems from './Pages/ListItems';
import ListTags from './Pages/ListTags';
import Item from './Pages/Item';
import RegisterUser from './Pages/RegisterUser';
import EditItem from './Pages/EditItem';
import {ApolloClient, InMemoryCache} from 'apollo-client-preset';
import {HttpLink} from "apollo-link-http";
import {ApolloProvider} from 'react-apollo';
import {Link, Route} from 'react-router-dom';
import {Menu} from 'semantic-ui-react';

const AppHeader = styled.header`
  background-color: black;
  height: 200px;
  padding: 20px;
  color:  #e75220;
  text-align: center;
`;

const AppLogo = styled.img`
  animation: ${spin} infinite 20s linear;
  height: 80px;
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const AppTitle = styled.h1`
  font-size: 1.5em;
`;

const AppBody = styled.div`
  margin-bottom: 30px;
  background-image: url(${background});
  background-size: contain;
  padding-bottom: 50px;
  min-height: 1000px;
`;



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

let uri = 'http://localhost:8080/graphql';

if(process.env.NODE_ENV === 'production') {
  uri = `https://toolpool-193609.appspot.com/graphql`;
}

// let uri = `https://toolpool-193609.appspot.com/graphql`;

const client = new ApolloClient({
  link: new HttpLink({ uri, }),
  cache: new InMemoryCache()
});



class App extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <AppHeader>
            <AppLogo src={logo} alt="logo"/>
            <AppTitle>ToolPool</AppTitle>
          </AppHeader>
          <AppBody>
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
              <Menu.Item>
                <Link to={"/signin"}>Sign In</Link>
              </Menu.Item>
            </Menu>
            <div>
              <Route path={"/create-item"} component={CreateItemForm}/>
              <Route exact path={"/items"} itemData={itemData} render={props => <ListItems {...props} />}/>
              <Route path={"/tags"} render={props => <ListTags{...props} />}/>
              <Route exact path={"/items/:id"} render={props => <Item {...props} />}/>
              <Route path={"/items/:id/edit"} render={props => <EditItem {...props} />}/>
              <Route path={"/signin"} component={SignIn}/>
              <Route path={"/signedIn"} component={RegisterUser}/>
            </div>
          </AppBody>
        </div>
      </ApolloProvider>
    );
  }
}


//Create Item Fragment


export default App;
