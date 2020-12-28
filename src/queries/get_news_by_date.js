import gql from "graphql-tag"
import {Menu} from "./get-menus"

const GET_NEWS_BY_DATE = gql`
  query GET_EVENTS_BY_DATE(
    $year:Int,
    $month:Int,
    $day:Int,
    $language: LanguageCodeFilterEnum,
  ) {
    news(where: {language: $language,orderby: {field: DATE, order: ASC}, dateQuery: {year: $year, month: $month, day: $day}}) {
   nodes {
      title
      databaseId
      date
      excerpt
      slug
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
  }
`
export default GET_NEWS_BY_DATE