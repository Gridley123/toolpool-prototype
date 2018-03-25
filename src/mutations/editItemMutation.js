import fragments from '../fragments';
import gql from 'graphql-tag';

export default gql`
    mutation EditItem($id:ID! $item: ItemInput!) {
        editItem(id: $id, item: $item) {
            ...Item_item
        }
    }
    ${fragments.item_item}
    ${fragments.price_price}
    ${fragments.geolocation_geolocation}
`;