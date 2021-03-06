import { gql } from "@apollo/client";

const ALL_REVIEW = gql`
query allReview ($lessonId: ID){
    allReviews(lessonId: $lessonId) {
        edges {
            node {
                id
                opComment
                opQualification
                user{
                    email
                }
                lesson {
                    id
                }
            }
        }
    }
}
`;
export default ALL_REVIEW;
