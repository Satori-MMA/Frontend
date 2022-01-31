import { gql } from "@apollo/client";

const ALL_COURSES = gql`
  query {
    allCourses {
      edges {
        node {
          id
          coTitle
          coPrice
          coDescription
          category{
            catName
          }
        }
      }
    }
  }
`;

export default ALL_COURSES;
