import { gql } from "@apollo/client";

const REGISTER_USER_LESSON = gql`
mutation lessonUserRegister ($userID: ID, $lessonID: ID){
    lessonUserRegister(input:{taCheck:true, lessonId: $lessonID, userId:$userID}){
      lessonsUser{
        user{
          email
        }
      }
    }
  }
  `;



export default REGISTER_USER_LESSON;

