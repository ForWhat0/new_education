import { gql } from "@apollo/client"
import {Menu} from "./get-menus"

const GET_PROJECT_BY_SLUG = gql`query(
$slug:ID!
) {
${Menu}
   project(id: $slug, idType: SLUG) {
    slug
    content
    title
     projectFields {
      bgImg {
        sourceUrl
      }
    }
  }
}
`

export default GET_PROJECT_BY_SLUG
