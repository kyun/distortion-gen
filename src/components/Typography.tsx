import React from "react";
import styled from "@emotion/styled";

const H1 = styled.h1`
  font-size: 3rem;
`;

const Tiny = styled.span`
  font-size: 0.8rem;
`;

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Title: React.FC<Props> = ({ children, ...props }) => {
  return <H1 {...props}>{children}</H1>;
};

export const TinyText: React.FC<Props> = ({ children, ...props }) => {
  return <Tiny {...props}>{children}</Tiny>;
};
