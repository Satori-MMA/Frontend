import { gql } from "@apollo/client";

const UPDATE_COURSE = gql`
mutation actualizar($id:ID,$coTitle:String,$coDescription:String,$coPrice:String,$categoryId:ID,$coImage:String,$isActive:Boolean,$coInstructor:String, $coDifficulty:String, $coCalendar:String){
  courseUpdate(input:{id:$id,
    coTitle:$coTitle,
    coDescription:$coDescription,
    coPrice:$coPrice,
    isActive:$isActive,
    coInstructor:$coInstructor,
    coDifficulty:$coDifficulty,
    coCalendar:$coCalendar,  
    categoryId:$categoryId,coImage:$coImage}){
    course{
      id
      isActive
    }
  }
}`;

export default UPDATE_COURSE;