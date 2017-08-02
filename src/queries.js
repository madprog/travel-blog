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

export const section = gql`
query($strId: String!) {
  section(strId: $strId) {
    id
    strId
    name
    articles {
      id
      strId
      name
      deleted
    }
  }
}`;
