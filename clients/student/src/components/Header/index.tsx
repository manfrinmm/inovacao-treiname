import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";

import logo from "~/assets/logo.svg";
import Button from "~/components/Button";
import { useAuth } from "~/hooks/auth";

import { Container, Content, Menu } from "./styles";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, signOut } = useAuth();

  const handleClickMenu = useCallback(() => {
    setIsOpen(state => !state);
  }, []);

  return (
    <Container>
      <Content>
        <Link to="/dashboard">
          <img src={logo} alt="Inovação Treinamentos" />
        </Link>

        <Menu isOpen={isOpen} onClick={handleClickMenu}>
          <nav>
            <div>
              <p>
                <Link to="/profile">{user?.name}</Link>
              </p>
              <span>{user?.cpf}</span>
            </div>
            <Button onClick={signOut}>Sair</Button>
          </nav>
          <span />
        </Menu>
      </Content>
    </Container>
  );
};

export default Header;
