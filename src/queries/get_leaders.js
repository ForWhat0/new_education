import { gql } from "@apollo/client";

const GET_LEADERS = gql`
  query(
    $location: MenuLocationEnum
    $contactsUri: ID!
    $language: LanguageCodeFilterEnum
  ) {
    menuItems(where: { location: $location }) {
      nodes {
        key: id
        parentId
        path
        title: label
        url
      }
    }

    leader(where: { language: $language }) {
      nodes {
        featuredImage {
          node {
            sourceUrl
          }
        }
        leaderField {
          nameLastname
          position
          phoneNum
          gmail
          bioInformation
          fileBio {
            mediaItemUrl
            fileSize
          }
        }
      }
    }

    contacts: page(id: $contactsUri, idType: URI) {
      databaseId
      contactsFields {
        adress
        facebookLink
        gmail
        iconSite {
          sourceUrl
        }
        titleSite
        descrSite
        telegramLink
        phoneNumber
        mapsLink
        mapsImg {
          sourceUrl
        }
      }
    }
  }
`;

export default GET_LEADERS;
