import { gql } from "@apollo/client";

const ALL_MONTHLY = gql`
  query allMonthly {
    allMonthlypayments {
      edges {
        node {
          id
          moStartDate
          moFinishDate
          moType
          moPrice
          user {
            id
            email
            firstName
            lastName
          }
        }
      }
    }
  }
`;

export default ALL_MONTHLY;
