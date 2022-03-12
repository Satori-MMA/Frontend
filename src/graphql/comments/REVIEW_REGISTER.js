import { gql } from "@apollo/client";

const REVIEW_REGISTER = gql`
mutation comentrio($opComment:String, $opQualification:String, , $lessonId:ID,$userId:ID)
{
  reviewRegister(input:{opComment:$opComment,opQualification:$opQualification,lessonId:$lessonId,userId:$userId}){
    review{
      opComment
    }
  }
}
`;
export default REVIEW_REGISTER;