import { gql } from "@apollo/client";


const FIND_LESSON = gql`
query findLesson($name:String){
    allLessons(leName:$name){
  	    edges{
            node{
            id
            leName
            leLinkVideo
          	leDescription
            course{
              id
            }            
            }
        }
    }
}
`;

export default FIND_LESSON;
