import gql from "graphql-tag";
const GET_PROJECTS = gql`
  query GET_PAGINATED_PROJECTS(
      $after: String,
    $before: String,
    $first: Int,
    $last: Int
  ) {
    projects (first:$first, last:$last, after:$after, before:$before){
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
export default GET_PROJECTS