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
                leDifficulty
                course{
                    coCalendar
                    id
                    coTitle
                }
              lessonuserSet{
                edges{
                  node{
                    
                    user{
                      email
                    }
                  }
                }
              }
        }
    }
}
}`;

export default ALL_LESSONS;
