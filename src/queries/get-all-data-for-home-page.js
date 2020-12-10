import { gql } from "@apollo/client";

const LAST_EVENTS_AND_LAST_NEWS_QUERY = gql`query($uri: String) {
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
  pageBy(uri: $uri) {
    mainPageFields {
        tekst
      titleBanner
      zagolovok
      sotrudniki {
        imya
        foto {
          sourceUrl
        }
      }
    }
  }
  }
`

export default LAST_EVENTS_AND_LAST_NEWS_QUERY;
