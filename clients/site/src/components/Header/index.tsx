import React from "react";

import logo from "~/assets/logo.svg";

import { Container, Content, Link, ButtonLogout } from "./styles";

const Header: React.FC = () => {
  return (
    <Container>
      <Content>
        <Link to="/">
          <img src={logo} alt="Inovação treinamentos" />
        </Link>
        <Link to="/certification">Certificação</Link>
        <ButtonLogout>Sair</ButtonLogout>
      </Content>
    </Container>
  );
};

export default Header;
