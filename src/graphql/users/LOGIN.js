import { gql } from "@apollo/client";

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      success
      errors
      unarchiving
      token
      #refreshToken,
      unarchiving
      user {
        id
        userPhone
        firstName
        lastName
        userAddress
        email
        verified
        rolUser {
          edges {
            node {
              id
              rolName
            }
          }
        }
      }
    }
  }
`;

export default LOGIN;
