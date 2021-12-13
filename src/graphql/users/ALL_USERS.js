import { gql } from "@apollo/client";

const ALL_USERS = gql`
  query {
    users {
      edges {
        node {
          id
          firstName
          archived
          verified
          email
          secondaryEmail
        }
      }
    }
  }
`;

export default ALL_USERS;
