import { gql } from "@apollo/client";

const ALL_MONTHLY = gql`
  query allMonthly {
    allMonthlypayment {
      edges {
        node {
          id
          moStartDate
          moFinishDate
          moType
          payment {
            id
            user {
              id
              firstName
              lastName
            }
          }
        }
      }
    }
  }
`;

export default ALL_MONTHLY;
