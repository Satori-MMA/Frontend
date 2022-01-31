import { gql } from "@apollo/client";


const OPINION_REGISTER = gql`
mutation contact($userName:String!, $userPhone:String!, $userEmail:String!, $userComment:String!)
{
    opinionRegister(
    input:{name:$userName,phone:$userPhone,email:$userEmail,comment:$userComment})   
    {
        contact{
            name
            phone
            comment
        }
    }
}
`;
export default OPINION_REGISTER;