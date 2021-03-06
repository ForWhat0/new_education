import { gql } from "@apollo/client";

const GET_PROJECT_BY_SLUG = gql`
  query($id: ID!, $location: MenuLocationEnum, $contactsUri: ID!) {
    contacts: page(id: $contactsUri, idType: URI) {
      contactsFields {
        telegramLink
        phoneNumber
        instagramLink
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
    menuItems(where: { location: $location }) {
      nodes {
        key: id
        parentId
        path
        title: label
        url
      }
    }
    project(id: $id, idType: DATABASE_ID) {
      slug
      databaseId
      content
      title
      projectFields {
        appLink
        bgColor
        playLink
        siteLink
        gallarySlider {
          sourceUrl
        }
        bgImg {
          sourceUrl
        }
      }
    }
  }
`;

export default GET_PROJECT_BY_SLUG;
