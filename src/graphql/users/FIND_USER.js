import { gql } from "@apollo/client";

const FIND_USER = gql`

query finduser($email: String!) {
    users (email:$email){
        edges {
            node {
                id
                lastName
                firstName
                userAddress
                userPhone
            }
        }
    }
}
`;

export default FIND_USER;