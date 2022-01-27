import { gql } from "@apollo/client";

const DELETE_USER = gql`
mutation deleteAccount($password:String!){
    deleteAccount(password: $password){
    success
    errors
    }
}`;

export default DELETE_USER;