import gql from "graphql-tag"

const GET_DATABASE_ID_FROM_TIME = gql`
  query GET_DATABASE_ID_FROM_TIME {
     times{
    nodes {
      databaseId
    }
  }
  }
`
export default GET_DATABASE_ID_FROM_TIME