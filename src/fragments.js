import gql from 'graphql-tag';

export default {
  item_item: gql`
      fragment Item_item on Item {
          id
          name
          description
          tags{
              ...Tag_tag
          }
          pricePerHire {
              ...Price_price
          }
          pricePerDay {
              ...Price_price
          }
          deposit {
              ...Price_price
          }
          geolocation {
              ...Geolocation_geolocation
          }
          status
      }
  `,
  price_price: gql`
      fragment Price_price on Price {
          amount
          currency
      }
  `,
  geolocation_geolocation: gql`
      fragment Geolocation_geolocation on Geolocation {
          lat
          lng
      }
  `,
  tag_tag: gql`
      fragment Tag_tag on Tag {
          id
          name
      }
  `,
  listTags_tag: gql`
      fragment ListTags_tag on Tag {
          id
          name
          numberOfUses
      }`,
  listItems_item: gql`
      fragment ListItems_item on Item {
          id
          name
      }
  `
}