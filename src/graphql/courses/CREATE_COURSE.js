import { gql } from "@apollo/client";

const CREATE_COURSE = gql`
mutation crearCurso($coTitle:String,$coDescription:String,$coImage:String,$coPrice:Float,$categoryId:ID,$coInstructor:String, $coDifficulty:String, $coCalendar:String){
    courseRegister(input:{coTitle:$coTitle,coDescription:$coDescription,coImage:$coImage,coPrice:$coPrice,categoryId:$categoryId,coInstructor:$coInstructor,coDifficulty:$coDifficulty,coCalendar:$coCalendar}){
        course{
            isActive
        }
    }
}`;

export default CREATE_COURSE;