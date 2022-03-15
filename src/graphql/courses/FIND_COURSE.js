import { gql } from "@apollo/client";


const FIND_COURSE = gql`
query findCourse($title:String){
    allCourses(coTitle:$title){
  	    edges{
            node{
            id
            coTitle
            coPrice
            coDescription
            coInstructor
            coCalendar
            coDifficulty
            coImage
            category{
                id
                catName
            }
            }
        }
    }
}
`;

export default FIND_COURSE;
