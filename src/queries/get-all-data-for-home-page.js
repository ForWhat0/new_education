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
  pageBy(uri: $uri) {
    mainPageFields {
      titleServices
      titleProject
      titleOffer
      titleEvent
      titleCommand
      titleBanner
      textOffer
      textCommand
      telegram
      register
      knp
      gmail
      footerPhone
      footerGmail
      footerAdress
      fieldGroupName
      facebook
      employees {
        name
        fotoSpivrobitnika {
          sourceUrl
        }
      }
    }
  }
  }
`

export default LAST_EVENTS_AND_LAST_NEWS_QUERY;
