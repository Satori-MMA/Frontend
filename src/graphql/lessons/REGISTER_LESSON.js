import { gql } from "@apollo/client";

const CREATE_LESSON = gql`
mutation createLesson($leName: String, $leDescription: String,$leEvaluation: Float, $leLinkVideo: String, $courseId: ID ){
    lessonRegister(input: {leName:$leName, leDescription: $leDescription, leEvaluation: $leEvaluation, leLinkVideo: $leLinkVideo, courseId: $courseId}){
        lesson{
            id
            leName
            course{
                id
              }
        }
    }
}`;

export default CREATE_LESSON;

