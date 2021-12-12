import { gql } from "@apollo/client";

const ALL_USERS = gql`
  query {
    allUsers {
      edges {
        node {
          email
          firstName
          lastName
        }
      }
    }
  }
`;

export default ALL_USERS;
