import { gql } from "@apollo/client";


const ALL_COURSES = gql`
query coursesQuery($after:String){
    allCourses(first: 5,after:$after){
  	    edges{
            node{
            id
            coTitle
            coPrice
            coDescription
            }
        }
        pageInfo{
            endCursor
        }
    }
}
`;

export default ALL_COURSES;
