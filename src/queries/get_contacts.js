import { gql } from "@apollo/client";

const GET_CONTACTS = gql`query(
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
databaseId
     contactsFields {
      adress
      facebookLink
      gmail
       iconSite {
        sourceUrl
      }
      titleSite
      descrSite
      telegramLink
      phoneNumber
      mapsLink
      mapsImg {
        sourceUrl
      }
    }
  
  }
 
  }
`

export default GET_CONTACTS;
