import gql from "graphql-tag";
const GET_PROJECTS_COUNT = gql`
  query GET_PROJECTS_COUNT {
    projects {
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
export default GET_PROJECTS_COUNT