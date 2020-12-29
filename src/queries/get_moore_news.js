import gql from "graphql-tag";

const GET_MOORE_NEWS = gql`
   query GET_PAGINATED_NEWS(
    $size: Int,
    $offset: Int
    $language: LanguageCodeFilterEnum
  ) {
 
news (where: { language: $language,orderby: {field: DATE, order: DESC}  offsetPagination: { size:$size, offset:  $offset } }){
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
export default GET_MOORE_NEWS