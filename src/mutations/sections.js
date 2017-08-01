import { graphql, gql } from 'react-apollo';

import * as queries from '../queries';

export const createSection = graphql(gql`
  mutation($name: String!) {
    createSection(name: $name) {
      section {
        id
        strId
        name
        deleted
      }
    }
  }
`, {
  name: 'createSection',
  options: {
    refetchQueries: [
      { query: queries.book },
    ],
  },
});

export const deleteSection = graphql(gql`
  mutation($id: Int!) {
    deleteSection(id: $id) {
      section {
        id
        deleted
      }
    }
  }
`, {
  name: 'deleteSection',
  options: {
    refetchQueries: [
      { query: queries.book },
    ],
  },
});

export const destroySection = graphql(gql`
  mutation($id: Int!) {
    destroySection(id: $id) {
      section {
        id
      }
    }
  }
`, {
  name: 'destroySection',
  options: {
    refetchQueries: [
      { query: queries.book },
    ],
  },
});

export const undeleteSection = graphql(gql`
  mutation($id: Int!) {
    undeleteSection(id: $id) {
      section {
        id
        deleted
      }
    }
  }
`, {
  name: 'undeleteSection',
  options: {
    refetchQueries: [
      { query: queries.book },
    ],
  },
});
