import gql from "graphql-tag"

const GET_EVENTS_DATE = gql`
  query GET_PAGINATED_NEWS(
    $status: PostStatusEnum
  ) {
    events(where: {status: $status}) {
    nodes {
      dateGmt
    }
  }
  }
`
export default GET_EVENTS_DATE