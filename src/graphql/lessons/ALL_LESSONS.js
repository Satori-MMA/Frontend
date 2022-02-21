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
                    leLinkVideo
                    isActive
                    course{
                        id
                        coTitle
                    }
            }
        }
    }
}`;

export default ALL_LESSONS;
