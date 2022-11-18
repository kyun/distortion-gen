import React from "react";
import styled from "@emotion/styled";

const Base = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  font-weight: 600;
`;
interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({ children, ...props }) => {
  return <Base {...props}>{children}</Base>;
};

export default Button;
