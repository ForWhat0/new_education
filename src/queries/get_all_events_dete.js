import gql from "graphql-tag";

const GET_EVENTS_DATE = gql`
  query GET_PAGINATED_NEWS(
    $status: PostStatusEnum
    $language: LanguageCodeFilterEnum
  ) {
    events(first: 5000, where: { status: $status, language: $language }) {
      nodes {
        dateGmt
      }
    }
  }
`;
export default GET_EVENTS_DATE;
