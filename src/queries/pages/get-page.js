import { gql } from "@apollo/client";
import {Menu} from "../get-menus";

export const GET_PAGE = gql`
	query GET_PAGE($uri: String) {
      ${Menu}
	  page: pageBy(uri: $uri) {
	    id
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