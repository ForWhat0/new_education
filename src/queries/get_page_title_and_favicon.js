import { gql } from "@apollo/client";

const GET_PAGE_TITLE_AND_FAVICON = gql`query(
$uri: ID!,
$contactsUri:ID!
) {
    
  contacts: page(id: $contactsUri, idType: URI) {

    contactsFields {
      titleSite
      descrSite
      iconSite {
        sourceUrl
      }
    }
  }
   page(id: $uri, idType: URI) {
    mainPageFields {
      titleBanner
     }
  }
  }
`

export default GET_PAGE_TITLE_AND_FAVICON;
