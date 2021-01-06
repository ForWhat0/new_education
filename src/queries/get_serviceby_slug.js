import { gql } from "@apollo/client"
import {Menu} from "./get-menus"

const GET_SERVICE_BY_SLUG = gql`query(
$slug:ID!
 $location:MenuLocationEnum,
   $contactsUri:ID!
) {
 menuItems(where: {location: $location}) {
    nodes {
       key: id
      parentId
      path
      title: label
      url
    }
  }
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
   service(id: $slug, idType: SLUG) {
    slug
    databaseId
    content
    title
     serveicesFields{
        showZno
        titleZno
        learn {
          nameLearn
        }
        accardion2{
          titleAccardion
          descrAccardion
        }
      }
  }
}
`

export default GET_SERVICE_BY_SLUG
