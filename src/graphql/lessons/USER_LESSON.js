import { gql } from "@apollo/client";

const USER_LESSON = gql`
query user_lesson($email:String){
    users(email:$email){
      edges{
        node{
      lessonuserSet{
        edges{
          node{
            lesson{
              leName
              course{
                coTitle
              }
            }
          }
        }
      }
        }
      }
    }
  }`;

export default USER_LESSON;
