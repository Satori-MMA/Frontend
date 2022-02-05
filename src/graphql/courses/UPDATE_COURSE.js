import { gql } from "@apollo/client";

const UPDATE_COURSE = gql`
mutation actualizar($id:ID,$coTitle:String,$coDescription:String,$coPrice:String,$categoryId:ID,$coImage:String,$isActive:Boolean){
  courseUpdate(input:{id:$id,
    coTitle:$coTitle,
    coDescription:$coDescription,
    coPrice:$coPrice,
    isActive:$isActive,  
    categoryId:$categoryId,coImage:$coImage}){
    course{
      id
      isActive
    }
  }
}`;

export default UPDATE_COURSE;