import { gql } from "@apollo/client"
import {Menu} from "./get-menus"

const GET_NEWS_BY_SLUG_AND_FIRST_THREE_NEWS = gql`query(
$slug:ID!
) {
   new(id: $slug, idType: SLUG) {
    slug
    content
    date
    title
  }
 ${Menu}
  news (first:3){
    nodes {
      title
      databaseId
      date
      excerpt
      slug
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
`

export default GET_NEWS_BY_SLUG_AND_FIRST_THREE_NEWS
