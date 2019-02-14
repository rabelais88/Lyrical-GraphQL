import gql from 'graphql-tag';

// ID! means non-nullable ID
export default gql`
  query SongQuery($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
      }
    }
  }
`;