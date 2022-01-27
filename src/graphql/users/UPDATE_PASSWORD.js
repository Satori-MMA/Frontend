import { gql } from "@apollo/client";

const UPDATE_PASSWORD = gql`


mutation updatePassword($oldPassword:String!,$password1: String!,$password2: String!){
    passwordChange(oldPassword: $oldPassword,newPassword1: $password1,newPassword2: $password2) {
        success,
        errors,
        token
    }
}`;

export default UPDATE_PASSWORD;