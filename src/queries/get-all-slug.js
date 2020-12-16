import { gql } from "@apollo/client";

const GetSLUG = gql`query {
  posts {
    nodes {
      slug
    }
  }
  }
`

export default GetSLUG;
