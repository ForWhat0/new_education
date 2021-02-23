import { gql } from "@apollo/client";

export const SEARCH_EVENTS_BY_TITLE = gql`
  query EventsByTitle($search: String, $language: LanguageCodeFilterEnum) {
    times(where: { search: $search, language: $language }) {
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
