import { gql } from "@apollo/client";

const GET_MENU_AND_CONTACTS = gql`
  query($location: MenuLocationEnum, $contactsUri: ID!) {
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
  }
`;

export default GET_MENU_AND_CONTACTS;
