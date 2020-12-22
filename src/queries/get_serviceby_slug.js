import { gql } from "@apollo/client"
import {Menu} from "./get-menus"

const GET_SERVICE_BY_SLUG = gql`query(
$slug:ID!
) {
${Menu}
   service(id: $slug, idType: SLUG) {
    slug
    content
    title
     serveicesFields{
        showZno
        accardion2{
          titleAccardion
          descrAccardion
        }
      }
  }
}
`

export default GET_SERVICE_BY_SLUG
