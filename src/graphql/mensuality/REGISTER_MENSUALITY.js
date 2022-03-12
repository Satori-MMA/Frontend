import { gql } from "@apollo/client";

const REGISTER_MENSUALITY = gql`
mutation registrarMensualidad($moStartDate:Date,$moFinishDate:Date,$moType:String,$moPrice:Float,$userId:ID){
    monthlypaymentRegister(input:{moStartDate:$moStartDate,moFinishDate:$moFinishDate,moType:$moType,moPrice:$moPrice,userId:$userId}){
        monthlyPayment{
            id
        }
    }
}`;

export default REGISTER_MENSUALITY;