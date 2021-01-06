import gql from "graphql-tag";
import {Menu} from "./get-menus";
const GET_NEWS = gql`
  query GET_PAGINATED_NEWS(
    $size: Int,
    $offset: Int,
    $language: LanguageCodeFilterEnum,
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
    news (where: { language: $language,offsetPagination: { size:$size, offset:  $offset } }){
    nodes {
      title
      databaseId
      date
      excerpt
      slug
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
   pageInfo {
            offsetPagination {
                hasMore
                hasPrevious
                total
            }
        }
  }
  }
`
export default GET_NEWS