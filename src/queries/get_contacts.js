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
 
  }
`

export default GET_CONTACTS;
