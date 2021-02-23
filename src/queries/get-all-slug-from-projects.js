import { gql } from "@apollo/client";

const GET_ALL_SLUG_FROM_PROJECTS = gql`
  query {
    projects(first: 5000) {
      nodes {
        databaseId
      }
    }
  }
`;

export default GET_ALL_SLUG_FROM_PROJECTS;
