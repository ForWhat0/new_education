import gql from "graphql-tag";
import {Menu} from "./get-menus";
const GET_PROJECTS = gql`
  query GET_PAGINATED_PROJECTS(
    $size: Int,
    $offset: Int
  ) {
    ${Menu}
    projects(where: { offsetPagination: { size:$size, offset:  $offset } }) {
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
       projectFields {
            bgColor
            bgImg {
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
export default GET_PROJECTS