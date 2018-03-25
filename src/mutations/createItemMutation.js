import fragments from '../fragments';
import gql from 'graphql-tag';

export default gql`
    mutation createItem($item: ItemInput!) {
        createItem(item: $item) {
            ...Item_item
            tags{
                name
                id
                numberOfUses
            }
        }
    }
    ${fragments.item_item}
    ${fragments.price_price}
    ${fragments.geolocation_geolocation}
`;