import { gql } from "@apollo/client";

const LAST_EVENTS_AND_LAST_NEWS_QUERY = gql`query(
$uri: ID!,
$language: LanguageCodeFilterEnum,
$location:MenuLocationEnum,
$contactsUri:ID!
) {
    events(first: 3, where: { language: $language,status: FUTURE, orderby: {field: DATE, order: ASC}}) {
    nodes {
      dateGmt
      eventsFields {
        hours {
          ... on Time {
            databaseId
            title
            hoursEvents {
              hoursEvents
            }
          }
        }
        hoursOne {
          ... on Time {
            databaseId
            title
            hoursEvents {
              hoursEvents
            }
          }
        }
      }
    }
  }
 news (where: { language: $language,orderby: {field: DATE, order: DESC}  offsetPagination: { size:3, offset: 0 } }){
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
   menuItems(where: {location: $location}) {
    nodes {
       key: id
      parentId
      path
      title: label
      url
    }
  }
  services (where: {language: $language}){
    nodes {
      title
      slug
      featuredImage {
        node {
          sourceUrl
        }
      }
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
       iconSite {
        sourceUrl
      }
      titleSite
      descrSite
    }
  }
   page(id: $uri, idType: URI) {
   databaseId
    mainPageFields {
     titleServices
      titleProject
      titleOffers
      titleNews
      titleEvent
      titleCommand
      titleBanner
      text
     projectPopular {
        ... on Project {
          title
          databaseId
          slug
          excerpt
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
      }
      employees {
        name
        photo {
          sourceUrl
        }
      }
    }
  }
  }
`

export default LAST_EVENTS_AND_LAST_NEWS_QUERY;
