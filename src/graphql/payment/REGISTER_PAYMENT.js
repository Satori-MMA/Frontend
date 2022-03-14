import { gql } from "@apollo/client";

const REGISTER_PAYMENT = gql`
mutation registerPyment($pDate: Date, $uId: ID,$cID: ID){
paymentRegister(input:{paDate:$pDate, userId: $uId,  courseId:$cID})
  {
    payment{
      paDate
    }
  }
}`;

export default REGISTER_PAYMENT;

