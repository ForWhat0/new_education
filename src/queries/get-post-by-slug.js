import { gql } from "@apollo/client"

const GetPOSTSULG = gql`query(
$slug:ID!
) {
   post(id: $slug, idType: SLUG) {
    slug
    content
    date
    title
  }

  }
`

export default GetPOSTSULG
