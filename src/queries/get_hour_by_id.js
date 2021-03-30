import gql from "graphql-tag";

const GET_HOUR_BY_ID = gql`
  query GET_HOUR_BY_ID(
    $id: ID!
    $location: MenuLocationEnum
    $contactsUri: ID!
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
    time(id: $id, idType: DATABASE_ID) {
      databaseId
      title
      content
      hoursEvents {
        hoursEvents
      }
    }
  }
`;
export default GET_HOUR_BY_ID;
