
import { gql } from "@apollo/client";

const EMAIL_RESET_PASSWORD = gql`
mutation sendEmail($email:String!){
    sendPasswordReset(email: $email){
    success
    errors
    }
}`;

export default EMAIL_RESET_PASSWORD;
