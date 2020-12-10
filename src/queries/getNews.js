import gql from "graphql-tag";
const GET_NEWS = gql`
  query GET_PAGINATED_NEWS(
    $after: String,
    $before: String,
    $first: Int,
    $last: Int
  ) {
    news (first:$first, last:$last, after:$after, before:$before){
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
export default GET_NEWS