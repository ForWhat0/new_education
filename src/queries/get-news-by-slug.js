import { gql } from "@apollo/client"
import {Menu} from "./get-menus"

const GET_NEWS_BY_SLUG_AND_FIRST_THREE_NEWS = gql`query(
$slug:ID!,
$location:MenuLocationEnum,
$language: LanguageCodeFilterEnum,
$contactsUri:ID!
) {
   new(id: $slug, idType: SLUG) {
    slug
    databaseId
    content
    date
    title
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
    menuItems(where: {location: $location}) {
    nodes {
       key: id
      parentId
      path
      title: label
      url
    }
  }
  news (where: {language: $language,orderby: {field: DATE, order: DESC}  offsetPagination: { size:3, offset: 0 } }){
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

export default GET_NEWS_BY_SLUG_AND_FIRST_THREE_NEWS
