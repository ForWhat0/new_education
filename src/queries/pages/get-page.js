import { gql } from "@apollo/client";
import {Menu} from "../get-menus";

export const GET_PAGE = gql`
	query GET_PAGE($uri: ID!,$location:MenuLocationEnum,
$contactsUri:ID!) {
      menuItems(where: {location: $location}) {
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
    }
  }
	 page(idType: URI, id: $uri) {
 
	databaseId
	    title
	    content
	    slug
	    uri
	    financeField{ 
	    bgImg{
          sourceUrl
        }
      year{
        yearTitle
    filePdf{
      dateFile
      downloadPdf{
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
