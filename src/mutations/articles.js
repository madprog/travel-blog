import { graphql, gql } from 'react-apollo';

import * as queries from '../queries';

export const createArticle = graphql(gql`
  mutation($sectionId: Int!, $name: String!) {
    createArticle(sectionId: $sectionId, name: $name) {
      article {
        id
        strId
        name
        deleted
      }
    }
  }
`, {
  name: 'createArticle',
  options: props => ({
    refetchQueries: [
      { query: queries.section, variables: { strId: props.sectionId } },
    ],
  }),
});

export const deleteArticle = graphql(gql`
  mutation($id: Int!) {
    deleteArticle(id: $id) {
      article {
        id
        deleted
      }
    }
  }
`, {
  name: 'deleteArticle',
  options: props => ({
    refetchQueries: [
      { query: queries.section, variables: { strId: props.sectionId } },
    ],
  }),
});

export const destroyArticle = graphql(gql`
  mutation($id: Int!) {
    destroyArticle(id: $id) {
      article {
        id
      }
    }
  }
`, {
  name: 'destroyArticle',
  options: props => ({
    refetchQueries: [
      { query: queries.section, variables: { strId: props.sectionId } },
    ],
  }),
});

export const undeleteArticle = graphql(gql`
  mutation($id: Int!) {
    undeleteArticle(id: $id) {
      article {
        id
        deleted
      }
    }
  }
`, {
  name: 'undeleteArticle',
  options: props => ({
    refetchQueries: [
      { query: queries.section, variables: { strId: props.sectionId } },
    ],
  }),
});
