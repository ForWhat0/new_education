import { gql } from "@apollo/client";

const LAST_EVENTS_AND_LAST_NEWS_QUERY = gql`query($uri: ID!) {
    events(first: 3, where: {status: FUTURE, orderby: {field: DATE, order: ASC}}) {
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
  news(where: {orderby: {field: DATE, order: ASC}}, first: 3) {
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
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
   menuItems {
    nodes {
       key: id
      parentId
      path
      title: label
      url
    }
  }
  services {
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
    mainPageFields {
     text
      titleBanner
      titleCommand
      titleEvent
      titleOffers
      titleProject
      titleServices
      titleNews
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
