import { gql } from "@apollo/client";

const UPDATE_LESSON = gql`
mutation updateLesson($id:ID,$leName:String,$leDescription:String,$leLinkVideo:String,$isActive:Boolean,$leDifficulty:String){
    lessonUpdate(input:
      {
      id:$id,
      leName:$leName,
      leDescription:$leDescription,
      leLinkVideo:$leLinkVideo,
      leDifficulty:$leDifficulty,
      isActive:$isActive}){  
      lesson{
          isActive
          id
          leName
          course{
            id
          }
      }
    }
  }`;

export default UPDATE_LESSON;