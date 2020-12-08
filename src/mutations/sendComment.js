import gql from "graphql-tag";

const SEND_COMMENT = gql`
 mutation ($input:CreateCommentInput!) {
    createComment(input: $input) {
        success
    }
}
`;

export default SEND_COMMENT;
