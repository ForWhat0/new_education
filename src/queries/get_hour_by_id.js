import gql from "graphql-tag"
import {Menu} from "./get-menus"

const GET_HOUR_BY_ID = gql`
  query GET_HOUR_BY_ID(
    $id:ID!,
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
      gmail
      facebookLink
      
      authorship
      adress
    }
  }
    time(id: $id, idType: DATABASE_ID) {
    title
    content
    hoursEvents {
      hoursEvents
    }
  }
  }
`
export default GET_HOUR_BY_ID