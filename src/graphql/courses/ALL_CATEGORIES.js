import { gql } from "@apollo/client";


const ALL_CATEGORIES = gql`
query {
    allCategories{
    edges{
      node{
        id
        catName
      }
    }
  }
}
`;
export default ALL_CATEGORIES;