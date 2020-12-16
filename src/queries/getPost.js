import { gql } from "@apollo/client"

const GET_POST = gql`query{
    posts(where: { language: EN }) {
    nodes {
        title
        content
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

export default GET_POST
