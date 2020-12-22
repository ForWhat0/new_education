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
  news (where: {orderby: {field: DATE, order: DESC}  offsetPagination: { size:3, offset: 0 } }){
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
            offsetPagination {
                hasMore
                hasPrevious
                total
            }
        }
  }
}
`

export default GET_NEWS_BY_SLUG_AND_FIRST_THREE_NEWS
