import { gql } from "@apollo/client";

const GET_ALL_SLUG_FROM_NEWS = gql`
  query {
    news(first: 5000) {
      nodes {
        databaseId
      }
    }
  }
`;

export default GET_ALL_SLUG_FROM_NEWS;
