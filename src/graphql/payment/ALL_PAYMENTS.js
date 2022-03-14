import { gql } from "@apollo/client";

const ALL_PAYMENTS = gql`
query allpy{
  allPayments{
    edges{
      node{
        id
        paDate
        course{
          id
          coTitle
        }
        user{
          id
          firstName
          email
        }
        
      }
    }
  }
}
`;

export default ALL_PAYMENTS;
