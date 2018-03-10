import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Card, Container, Icon, List, Loader} from 'semantic-ui-react';
import gql from 'graphql-tag';
import {compose, graphql} from 'react-apollo';
import _ from 'lodash';


class ListItems extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleDelete = this.handleDelete.bind(this);
  }


  handleDelete(event) {
    event.preventDefault();
    const { id } = event.target;
    this.props.mutate({
      variables: {
        id,
      },
      update: (proxy, { data: { deleteItem } }) => {
        const data = proxy.readQuery({ query: LIST_ITEMS_QUERY });
        _.remove(data.listItems, item =>
          item.id === deleteItem.id
        );
        proxy.writeQuery({ query: LIST_ITEMS_QUERY, data });
      }
    })
  }


  render() {
    const { loading, listItems } = this.props.data;
    if (loading) {
      return (
        <Loader size="huge" inline={"centered"}/>
      )
    } else {
      const itemsList = listItems ? listItems.map((item) => {
        return (
          <List.Item key={item.id}>
            <Card>
              <Card.Content>
                <Card.Header>
                  <Link to={`/items/${item.id}`}>
                    {item.name}
                  </Link>
                  <a onClick={this.handleDelete} >
                    <Icon name={"close"} id={item.id}/>
                  </a>
                </Card.Header>
              </Card.Content>
            </Card>
          </List.Item>
        )
      }) : null;

      return (
        <div>
          <Container>
            <List>
              {itemsList}
            </List>
          </Container>
        </div>
      );
    }
  }
}

ListItems.fragments = {
  listItems: gql`
      fragment ListItemPageItem on Item {
          id
          name
      }
  `
};

export const LIST_ITEMS_QUERY = gql`
    query ListItems {
        listItems {
            ...ListItemPageItem
        }
    }
    ${ListItems.fragments.listItems}
`;

export const DELETE_ITEM_MUTATION = gql`
    mutation DeleteItem($id: ID!){
        deleteItem(id: $id){
            id
            name
        }
    }
`;

const ListItemsQueryEnhancer = graphql(LIST_ITEMS_QUERY, {
  options: {
    pollInterval: 20000
  }
});

const DeleteMutationEnhancer = graphql(DELETE_ITEM_MUTATION);

const ListItemsWithData = compose(ListItemsQueryEnhancer, DeleteMutationEnhancer)(ListItems);

export default ListItemsWithData;
