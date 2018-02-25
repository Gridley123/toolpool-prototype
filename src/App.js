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

// const schema = makeExecutableSchema({ typeDefs });
// addResolveFunctionsToSchema(schema, resolverMap);
// addMockFunctionsToSchema({ schema, mocks });

//Mocking client

// const client = new ApolloClient({
//   link: new SchemaLink({ schema }),
//   cache: new InMemoryCache(),
// });

// When you have a server setup, replace the above client with the following to test your server.
//
const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache()
});

//


// class DataDisplayer extends Component {
//   constructor(props, context) {
//     super(props, context);
//     this.state = {
//       displayResult: false,
//     };
//     this.toggleDisplayResult = this.toggleDisplayResult.bind(this);
//     this.mutate = this.props.hasOwnProperty('mutate');
//   }
//
//   toggleDisplayResult() {
//     if (this.mutate) {
//       this.sendMutation()
//     }
//     this.setState((prevState) => {
//       return { displayResult: !prevState.displayResult }
//     });
//   }
//
//   sendMutation() {
//     this.props.mutate({
//       refetchQueries: [{
//         query: itemsListQuery
//       }]
//     });
//   }
//
//   render() {
//     const buttonText = () => {
//       if (!this.state.displayResult) {
//         return this.mutate ? 'Call Mutate' : 'Display Query Result'
//       } else {
//         return this.mutate ? 'Call Mutate' : 'Close'
//       }
//     };
//
//     const pre = this.state.displayResult ? <pre style={{ textAlign: 'left' }}
//                                                 dangerouslySetInnerHTML={{ __html: JSON.stringify(this.props.data, undefined, 2) }}/> : null;
//     return (
//       <div>
//         <h3>{this.props.componentName}</h3>
//         <button onClick={this.toggleDisplayResult}>{buttonText()}</button>
//         <div>
//           {pre}
//         </div>
//       </div>
//     )
//   }
// }

// const ITEMS_LIST_QUERY = gql`
//     query ItemsListQuery {
//         listItems {
//             id
//             name
//             tags {
//                 id
//                 name
//                 numberOfUses
//             }
//             description
//             status
//             pricePerDay {
//                 amount
//                 currency
//             }
//             pricePerHire {
//                 amount
//                 currency
//             }
//             geolocation {
//                 lat
//                 long
//             }
//             bookings {
//                 start
//                 end
//                 item
//                 totalPrice {
//                     amount
//                     currency
//                 }
//             }
//         }
//     }
// `;
//
// const ItemListDisplayerWithData = graphql(itemsListQuery)(DataDisplayer);
//
// const createItem = gql`
//     mutation createItem {
//         createItem(item: { status: PUBLISHED, name: "Hi" }) {
//             id
//             name
//             status
//             description
//         }
//     }
// `;
//
// const ItemCreateDisplayerWithMutation = graphql(createItem)(DataDisplayer);
//
// const bookingsListQuery = gql`
//     query BookingsListQuery {
//         listBookings {
//             id
//             status
//             start
//             end
//             item
//             totalPrice{
//                 amount
//                 currency
//             }
//         }
//     }
// `;
//
// const BookingListDisplayerWithData = graphql(bookingsListQuery)(DataDisplayer);
//
// // const getItemQuery = gql`
// //   query getItemQuery
// // `


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
