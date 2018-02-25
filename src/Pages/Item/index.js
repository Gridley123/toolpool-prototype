import React from 'react';
import { Link } from 'react-router-dom';
import {Card, Container, List, Loader} from 'semantic-ui-react';
import getSymbolFromCurrency from 'currency-symbol-map'
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';


const Item = ({ data }) => {
  console.log(data);
  if (data.loading) {
    return (
      <Loader size="huge" inline={"centered"}/>
    )
  } else {

    const thisItemData = data.hasOwnProperty("getItem") ? data.getItem : null;
    let tagList;
    if (thisItemData.tags && thisItemData.tags.length > 0) {
      tagList = thisItemData.tags.map(tag => {
        return (
          <List.Item key={tag.id}>
            {tag.name}
          </List.Item>
        )
      })
    } else {
      tagList = null;
    }

    const currencySymbol = getSymbolFromCurrency(thisItemData.pricePerDay.currency);
    return (
      <div>
        <Container>
          <Card>
            <Card.Content>
              <Card.Header>
                {thisItemData.name || null}
              </Card.Header>
              <Card.Description>
                <Link to={`/items/${thisItemData.id}/edit`}>
                  Edit
                </Link>
              </Card.Description>
              <Card.Meta>
                <List horizontal>
                  <List.Item>
                    Tags:
                  </List.Item>
                  {tagList}
                </List>
              </Card.Meta>
              <Card.Meta>
                Price per Day:&nbsp;
                {`${currencySymbol}${thisItemData.pricePerDay.amount}`}
              </Card.Meta>
              <Card.Meta>
                Price per Hire:&nbsp;
                {`${currencySymbol}${thisItemData.pricePerHire.amount}`}
              </Card.Meta>
              <Card.Meta>
                Deposit:&nbsp;
                {`${currencySymbol}${thisItemData.deposit.amount}`}
              </Card.Meta>
              <Card.Description>
                {thisItemData.description}
              </Card.Description>
            </Card.Content>
          </Card>
        </Container>
      </div>
    );
  }
};


Item.fragments = {
  item: gql`
      fragment ItemPageItem on Item {
          id
          name
          description
          tags {
              id
              name
          }
          pricePerHire {
              ...price
          }
          pricePerDay {
              ...price
          }
          deposit {
              ...price
          }
          geolocation {
              ...geolocation
          }
          status
      }
  `,
  price: gql`
      fragment price on Price {
          amount
          currency
      }
  `,
  geolocation: gql`
      fragment geolocation on Geolocation {
          lat
          lng
      }
  `
};

export const ITEM_QUERY = gql`
    query GetItem($id: ID!) {
        getItem(id:$id){
            ...ItemPageItem
        }
    }
    ${Item.fragments.item}
    ${Item.fragments.price}
    ${Item.fragments.geolocation}

`;

const ItemWithData = graphql(ITEM_QUERY, {
  options: (({ match }) => ({ variables: { id: match.params.id } }))
})(Item);

export default ItemWithData;

export const fragments = Item.fragments;
