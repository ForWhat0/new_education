import { gql } from "@apollo/client";

const GET_ALL_SLUG_FROM_NEWS = gql`query {
  news {
    nodes {
      slug
    }
  }
  }
`

export default GET_ALL_SLUG_FROM_NEWS;
