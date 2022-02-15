import { gql } from "@apollo/client";

const ALL_LESSONS = gql`
query allLesson{
        allLessons{
            edges{
                node{
                    id
                    leName
                    leDescription
                    leEvaluation
            }
        }
    }
}`;

export default ALL_LESSONS;
