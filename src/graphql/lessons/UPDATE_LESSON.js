import { gql } from "@apollo/client";

const UPDATE_LESSON = gql`
mutation updateLesson($id:ID,$leName:String,$leDescription:String,$leLinkVideo:String,$isActive:Boolean){
    lessonUpdate(input:
      {
      id:$id,
      leName:$leName,
      leDescription:$leDescription,
      leLinkVideo:$leLinkVideo,
      isActive:$isActive}){  
      lesson{
          isActive
          id
          leName
      }
    }
  }`;

export default UPDATE_LESSON;