import { gql } from "@apollo/client";

const USER_COURSES = gql`
  query userCourses($email: String!) {
    allUsers(email: $email) {
      edges {
        node {
          paymentSet {
            edges {
              node {
                course {
                  id
                  coTitle
                  coPrice
                  coDescription
                  category {
                    catName
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default USER_COURSES;
