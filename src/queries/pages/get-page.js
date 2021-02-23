import { gql } from "@apollo/client";

export const GET_PAGE = gql`
  query GET_PAGE($uri: ID!, $location: MenuLocationEnum, $contactsUri: ID!) {
    menuItems(where: { location: $location }) {
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
    page(idType: URI, id: $uri) {
      databaseId
      title
      content
      slug
      uri
      financeField {
        link
        fileText
        file {
          mediaItemUrl
          fileSize
        }
        bgImg {
          sourceUrl
        }
        year {
          yearTitle
          filePdf {
            dateFile
            downloadPdf {
              dateGmt
              fileSize
              mediaItemUrl
            }
          }
        }
      }
    }
  }
`;
