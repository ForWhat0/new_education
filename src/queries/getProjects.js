import gql from "graphql-tag";
const GET_PROJECTS = gql`
  query GET_PAGINATED_PROJECTS(
    $size: Int
    $offset: Int
    $language: LanguageCodeFilterEnum
    $location: MenuLocationEnum
    $contactsUri: ID!
  ) {
    contacts: page(id: $contactsUri, idType: URI) {
      contactsFields {
        telegramLink
        phoneNumber
        group
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
    projects(
      where: {
        orderby: { field: DATE, order: DESC }
        language: $language
        offsetPagination: { size: $size, offset: $offset }
      }
    ) {
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
        projectFields {
          bgColor
          videoProject
          bgImg {
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
  }
`;
export default GET_PROJECTS;
