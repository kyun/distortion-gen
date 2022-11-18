import React from "react";
import styled from "@emotion/styled";

const Main = styled.main`
  padding: 2rem;
`;

interface Props {
  children: React.ReactNode;
}
const Layout: React.FC<Props> = ({ children }) => {
  return <Main>{children}</Main>;
};
export default Layout;
