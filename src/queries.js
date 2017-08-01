import { gql } from 'react-apollo';

export const book = gql`
query {
  book {
    id
    strId
    name
    deleted
  }
}`;
