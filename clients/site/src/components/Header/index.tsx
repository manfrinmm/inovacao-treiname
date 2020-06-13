import React, { useState, useCallback } from "react";

import logo from "~/assets/logo.svg";

import Button from "../Button";
import { Container, Content, Link, Menu } from "./styles";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickMenu = useCallback(() => {
    setIsOpen(state => !state);
  }, []);

  return (
    <Container>
      <Content>
        <Link to="/">
          <img src={logo} alt="Inovação treinamentos" />
        </Link>
        <Menu isOpen={isOpen} onClick={handleClickMenu}>
          <nav>
            <Link to="/certification">Certificação</Link>
            <div>
              <Button>Entrar</Button>
              <Button>Cadastra-se</Button>
            </div>
          </nav>
          <span />
        </Menu>
      </Content>
    </Container>
  );
};

export default Header;
