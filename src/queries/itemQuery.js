import gql from 'graphql-tag';
import fragments from '../fragments';

export default gql`  
    query ItemQuery($id: ID!) {
        getItem(id:$id){
            ...Item_item
        }
    }
    ${fragments.item_item}
    ${fragments.price_price}
    ${fragments.geolocation_geolocation}
  `