import React from "react";

import Header from "~/components/Header";

import { Wrapper } from "./styles";

const DefaultLayout: React.FC = ({ children }) => (
  <>
    <Header />
    <Wrapper>{children}</Wrapper>
  </>
);

export default DefaultLayout;
