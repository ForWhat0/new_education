import { gql } from "@apollo/client"
import {Menu} from "./get-menus"

const GET_PROJECT_BY_SLUG = gql`query(
$id:ID!,
$location:MenuLocationEnum,
$contactsUri:ID!
) {
 contacts: page(id: $contactsUri, idType: URI) {
    contactsFields {
      telegramLink
      phoneNumber
      group
       iconSite {
        sourceUrl
      }
      titleSite
      descrSite
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
   project(id: $id, idType: DATABASE_ID) {
    slug
    databaseId
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
