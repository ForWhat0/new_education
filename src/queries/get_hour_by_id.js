import gql from "graphql-tag"
import {Menu} from "./get-menus"

const GET_HOUR_BY_ID = gql`
  query GET_HOUR_BY_ID(
    $id:ID!
  ) {
    ${Menu}
    time(id: $id, idType: DATABASE_ID) {
    title
    excerpt
    hoursEvents {
      hoursEvents
    }
  }
  }
`
export default GET_HOUR_BY_ID