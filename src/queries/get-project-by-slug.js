import { gql } from "@apollo/client"

const GET_PROJECT_BY_SLUG = gql`query(
$slug:ID!
) {
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
