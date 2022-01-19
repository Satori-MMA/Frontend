import { gql } from "@apollo/client";

const REGISTER = gql`
mutation Register($userPhone:String!,$userAddress:String!,$firstName:String!,$lastName:String!,$email:String!,$password1:String!,$password2:String!){
    userRegister(userPhone:$userPhone,userAddress:$userAddress,firstName:$firstName,lastName:$lastName,email:$email,password1:$password1,password2:$password2){
        success
        errors
        user{
            email
            firstName
        }
    }
}`;

export default REGISTER;