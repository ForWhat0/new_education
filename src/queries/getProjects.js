import gql from "graphql-tag";
import {Menu} from "./get-menus";
const GET_PROJECTS = gql`
  query GET_PAGINATED_PROJECTS(
    $size: Int,
    $offset: Int,
    $language: LanguageCodeFilterEnum,
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
    projects(where: { language: $language,offsetPagination: { size:$size, offset:  $offset } }) {
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
       projectFields {
            bgColor
            bgImg {
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
export default GET_PROJECTS