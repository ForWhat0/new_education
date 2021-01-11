import { gql } from "@apollo/client"
import {Menu} from "./get-menus"

const GET_NEWS_BY_TITLE = gql`query(
$string:String,
$language: LanguageCodeFilterEnum,
) {

  news (where: { search:$string,language: $language,orderby: {field: DATE, order: DESC}  }){
    nodes {
      title
      databaseId
      date
      slug
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
 
  }
}
`

export default GET_NEWS_BY_TITLE
