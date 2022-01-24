import { gql } from "@apollo/client";


const FIND_COURSE = gql`
query findCourse($title:String){
    allCourses(coTitle:$title){
  	    edges{
            node{
            coTitle
            coPrice
            coDescription
            }
        }
    }
}
`;

export default FIND_COURSE;
