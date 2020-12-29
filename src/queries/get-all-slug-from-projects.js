import { gql } from "@apollo/client";

const GET_ALL_SLUG_FROM_PROJECTS = gql`query {
  projects(first: 500) {
    nodes {
      slug
    }
  }
  }
`

export default GET_ALL_SLUG_FROM_PROJECTS
