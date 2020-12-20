import { gql } from "@apollo/client";

export const Menu = `
  menuItems {
    nodes {
      key: id
      parentId
      title: label
      url
      path
    }
  }
  
`

export const GET_MENUS = gql`
query GET_MENUS {
  ${Menu}
}
`
