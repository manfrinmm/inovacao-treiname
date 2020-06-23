import React from "react";

import Footer from "~/components/Footer";
import Header from "~/components/Header";
import { useAuth } from "~/hooks/auth";

import { Wrapper } from "./styles";

const DefaultLayouts: React.FC = ({ children }) => {
  const { user } = useAuth();

  return (
    <>
      {user && <Header />}
      <Wrapper>{children}</Wrapper>
      {user && <Footer />}
    </>
  );
};

export default DefaultLayouts;
