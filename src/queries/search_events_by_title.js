import { gql } from "@apollo/client";

export const SEARCH_EVENTS_BY_TITLE = gql` query Product($search: String) {
  times(where: {search: $search}) {
    nodes {
     databaseId
            title
            hoursEvents {
              hoursEvents
            }
    }
  }
  }
`;

