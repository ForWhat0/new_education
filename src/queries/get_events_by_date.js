import gql from "graphql-tag"
import {Menu} from "./get-menus"

const GET_EVENTS_BY_DATE = gql`
  query GET_EVENTS_BY_DATE(
    $status: PostStatusEnum,
    $year:Int,
    $month:Int,
    $day:Int
  ) {
    ${Menu}
    events(where: {orderby: {field: DATE, order: ASC},status: $status, dateQuery: {year: $year, month: $month, day: $day}}, first: 1) {
    nodes {
      databaseId
      dateGmt
      eventsFields {
        hours {
          ... on Time {
            databaseId
            title
            hoursEvents {
              hoursEvents
            }
          }
        }
      }
    }
  }
  }
`
export default GET_EVENTS_BY_DATE