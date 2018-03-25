import gql from 'graphql-tag';
import fragments from '../fragments';

export default gql`
    query ListItems {
        listItems {
            ...ListItemPageItem
        }
    }
    ${fragments.listItems_item}
`;