import { gql } from "@apollo/client";

const GET_ALL_SLUG_FROM_SERVICES = gql`query {
  services {
    nodes {
      slug
    }
  }
  }
`

export default GET_ALL_SLUG_FROM_SERVICES
