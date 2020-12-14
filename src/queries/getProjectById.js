import gql from "graphql-tag";
const GET_PROJECT_BY_ID = gql`
   query PreviewPost($id: ID!) {
      project(id: $id, idType: DATABASE_ID) {
        databaseId
    slug
    content
    date
    title
    featuredImage {
      node {
        sourceUrl
      }
    }
      }
    }
`
export default GET_PROJECT_BY_ID