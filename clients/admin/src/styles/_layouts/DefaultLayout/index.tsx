import React from "react";

import Header from "~/components/Header";
import { useAuth } from "~/hooks/auth";

import { Wrapper } from "./styles";

const DefaultLayout: React.FC = ({ children }) => {
  const { token } = useAuth();
  return (
    <>
      {token && <Header />}
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default DefaultLayout;
