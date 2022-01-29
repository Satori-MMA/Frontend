import { gql } from "@apollo/client";

const CREATE_COURSE = gql`
mutation crearCurso($coTitle:String,$coDescription:String,$coImage:String,$coPrice:Float,$categoryId:ID){
    courseRegister(input:{coTitle:$coTitle,coDescription:$coDescription,coImage:$coImage,coPrice:$coPrice,categoryId:$categoryId}){
        course{
            isActive
        }
    }
}`;

export default CREATE_COURSE;