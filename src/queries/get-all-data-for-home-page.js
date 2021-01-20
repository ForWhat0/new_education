import { gql } from "@apollo/client";

const LAST_EVENTS_AND_LAST_NEWS_QUERY = gql`query(
$uri: ID!,
$language: LanguageCodeFilterEnum
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
