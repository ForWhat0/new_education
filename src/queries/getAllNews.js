import gql from "graphql-tag";

const GET_NEWS_ALL_NEWS = gql`
  query GET_PAGINATED_NEWS{
    news{
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
export default GET_NEWS_ALL_NEWS