import styled from "styled-components";
import { IconBackgroundSvg } from "../icon/icon";

const Field = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;
const Text = styled.div`
  display: flex;
  flex-wrap: wrap;
  strong {
    margin-right: 10px;
  }
  @media screen and (max-width: 500px) {
    font-size: 14px;
  }
`;

export const FieldTextIcon = ({ icon, title, content }) => {
  return (
    <Field>
      {icon && <IconBackgroundSvg src={icon} />}
      <Text>
        {title && <strong>{title}</strong>}
        {content && <span>{content}</span>}
      </Text>
    </Field>
  );
};
