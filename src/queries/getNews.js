import gql from "graphql-tag";
import {Menu} from "./get-menus";
const GET_NEWS = gql`
  query GET_PAGINATED_NEWS(
    $size: Int,
    $offset: Int
  ) {
    ${Menu}
    news (where: { offsetPagination: { size:$size, offset:  $offset } }){
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
export default GET_NEWS