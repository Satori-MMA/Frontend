import { gql } from "@apollo/client";

const UPDATE_USER = gql`
mutation update($userPhone:String!,$userAddress:String!, $email: String!, $firstName:String!,$lastName:String!){
updateAccount(firstName: $firstName, lastName: $lastName, email: $email, userPhone:$userPhone, userAddress:$userAddress){
    success
    errors
    }
}`;

export default UPDATE_USER;