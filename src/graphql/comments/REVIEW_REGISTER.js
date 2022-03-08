import { gql } from "@apollo/client";

const REVIEW_REGISTER = gql`
mutation comentrio($opComment:String, $opQualification:String, , $lessonId:ID)
{
  reviewRegister(input:{opComment:$opComment,opQualification:$opQualification,lessonId:$lessonId}){
    review{
      opComment
    }
  }
}
`;
export default REVIEW_REGISTER;