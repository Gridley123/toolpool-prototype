import React from 'react';
import { Link } from 'react-router-dom';
import {Card, Container, List, Loader} from 'semantic-ui-react';
import getSymbolFromCurrency from 'currency-symbol-map'
import {graphql} from 'react-apollo';
import itemQuery from '../../queries/itemQuery';


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




const ItemWithData = graphql(itemQuery, {
  options: (({ match }) => ({ variables: { id: match.params.id } }))
})(Item);

export default ItemWithData;

export const fragments = Item.fragments;
