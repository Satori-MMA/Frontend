import { gql } from "@apollo/client";

const RESETPASSWORD = gql`


mutation resetPassword($token:String!,$password1: String!,$password2: String!){
    passwordReset(token: $token, newPassword1: $password1, newPassword2: $password2){
    success
    errors
    }
}`;

export default RESETPASSWORD;