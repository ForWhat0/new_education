import { gql } from "@apollo/client";

const GET_MENU_AND_CONTACTS = gql`query(
$location:MenuLocationEnum,
$contactsUri:ID!,
$uri:ID!
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
appeals:page(idType: URI, id: $uri) {
    mainPageFields {
      appeals {
        appealsText
      }
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
 
  }
`

export default GET_MENU_AND_CONTACTS;
