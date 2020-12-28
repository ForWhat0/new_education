import { gql } from "@apollo/client";

export const SEARCH_EVENTS_BY_TITLE = gql` query Product($search: String ,$language: LanguageCodeFilterEnum) {
  times(where: {search: $search,language: $language}) {
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

