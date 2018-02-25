import React, {Component} from 'react'
import {Card, Container, Form, List, Loader} from 'semantic-ui-react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import lodash from 'lodash';


class ListTags extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      sort: 'ASC'
    };
    this.onSortChange = this.onSortChange.bind(this)
  }

  onSortChange(e, { value }) {
    this.setState({
      sort: value,
    })
  }

  render() {
    const { loading, listTags } = this.props.data;
    if (loading) {
      return (
        <Loader size="huge" inline={"centered"}/>
      )
    } else {
      const sortedTagsListFunc = () => {
        let sortedTaglist = listTags;
        if (this.state.sort) {
          const sortedTagListASC = lodash.sortBy(listTags, [(tag) => tag.name.toLowerCase()]);
          this.state.sort === 'DESC' ? sortedTaglist = lodash.reverse(sortedTagListASC) : sortedTaglist = sortedTagListASC;
        }
        return sortedTaglist;
      }
      const tagsList = sortedTagsListFunc().map((tag) => {
        return (
          <List.Item key={tag.id}>
            <Card>
              <Card.Content>
                <Card.Header>
                  {tag.name}
                </Card.Header>
                <Card.Meta>
                  Number of Uses: {tag.numberOfUses}
                </Card.Meta>
              </Card.Content>
            </Card>
          </List.Item>
        )
      });

      const sortOptions = [
        { text: 'ASC', value: 'ASC' },
        { text: 'DESC', value: 'DESC' },
      ];

      return (
        <div>
          <Container>
            <Form size={"small"}>
              <Form.Field>
                <label style={{ color: "white" }}>Sort in alphabetical order:</label>
                <Form.Select
                  size="small"
                  onChange = {this.onSortChange}
                  options={sortOptions}
                  placeholder="Sort in alphabetical order..."
                  name="sort"
                  value={this.state.sort}
                />
              </Form.Field>
            </Form>
            <List>
              {tagsList}
            </List>
          </Container>
        </div>
      );
    }
  }
}

ListTags.fragments = {
  listTags: gql`
      fragment ListTagPageTag on Tag {
          id
          name
          numberOfUses
      }
  `
};

export const LIST_TAGS_QUERY = gql`
    query ListTags {
        listTags {
            ...ListTagPageTag
        }
    }
    ${ListTags.fragments.listTags}
`;


const ListTagsWithData = graphql(LIST_TAGS_QUERY, {
  options: {
    pollInterval: 20000,
  }
})(ListTags)

export default ListTagsWithData
