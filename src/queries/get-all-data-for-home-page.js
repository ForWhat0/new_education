import { gql } from "@apollo/client";

const LAST_EVENTS_AND_LAST_NEWS_QUERY = gql`query($uri: ID!) {
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
  events(where: {orderby: {field: DATE, order: ASC}}, first: 3) {
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
  services {
    nodes {
      title
      databaseId
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
   projects {
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
            app
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
