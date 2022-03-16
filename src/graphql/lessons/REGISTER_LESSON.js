import { gql } from "@apollo/client";

const CREATE_LESSON = gql`
mutation createLesson($leName: String, $leDescription: String,$leEvaluation: Float, $leLinkVideo: String, $courseId: ID, $leDifficulty:String ){
    lessonRegister(input: {leName:$leName, leDescription: $leDescription, leEvaluation: $leEvaluation, leLinkVideo: $leLinkVideo, courseId: $courseId, leDifficulty:$leDifficulty}){
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

