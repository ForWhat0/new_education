import { gql } from "@apollo/client"
import {Menu} from "./get-menus"

const GET_PROJECT_BY_SLUG = gql`query(
$slug:ID!,
$location:MenuLocationEnum,
$contactsUri:ID!
) {
 contacts: page(id: $contactsUri, idType: URI) {
    contactsFields {
      telegramLink
      phoneNumber
      group
      gmail
      facebookLink
      
      authorship
      adress
    }
  }
    menuItems(where: {location: $location}) {
    nodes {
       key: id
      parentId
      path
      title: label
      url
    }
  }
   project(id: $slug, idType: SLUG) {
    slug
    content
    title
     projectFields {
      appLink
        bgColor
        playLink
        siteLink
      bgImg {
        sourceUrl
      }
    }
  }
}
`

export default GET_PROJECT_BY_SLUG
