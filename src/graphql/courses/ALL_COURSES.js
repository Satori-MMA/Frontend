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
        }
      }
    }
  }
`;

export default ALL_COURSES;
