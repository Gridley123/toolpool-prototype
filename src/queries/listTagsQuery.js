import gql from 'graphql-tag';
import fragments from '../fragments';

export default gql`
    query ListTags {
        listTags {
            ...ListTags_tag
        }
    }
    ${fragments.listTags_tag}
`;