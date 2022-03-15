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
          coInstructor
          coCalendar
          coDifficulty
          category{
            id
            catName
          }
          isActive
          coImage
        }
      }
    }
  }
`;

export default ALL_COURSES;
