import React from "react";

import { Container, Content, Link, ButtonLogout } from "./styles";

const Header: React.FC = () => {
  return (
    <Container>
      <Content>
        <Link to="/dashboard">Dashboard</Link>
        <ButtonLogout>Sair</ButtonLogout>
      </Content>
    </Container>
  );
};

export default Header;
