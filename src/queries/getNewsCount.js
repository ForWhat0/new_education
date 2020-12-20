import gql from "graphql-tag"

const GET_NEWS_COUNT = gql`
  query GET_NEWS_COUNT {
    news {
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
export default GET_NEWS_COUNT