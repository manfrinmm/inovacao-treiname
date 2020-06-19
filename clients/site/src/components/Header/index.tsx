import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

import logo from "~/assets/logo.svg";
import { useAuth } from "~/hooks/auth";

import Button from "../Button";
import { Container, Content, Link, Menu, Profile } from "./styles";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { signOut, user } = useAuth();
  const history = useHistory();

  const handleClickMenu = useCallback(() => {
    setIsOpen(state => !state);
  }, []);

  const handleGoToSignIn = useCallback(() => {
    history.push("/signIn");
  }, [history]);

  const handleGoToSignUp = useCallback(() => {
    history.push("/signUp");
  }, [history]);

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
              {user ? (
                <Profile>
                  <p>Olá, {user.name.split(" ")[0]}</p>
                  <Button onClick={signOut}>Sair</Button>
                </Profile>
              ) : (
                <>
                  <Button onClick={handleGoToSignIn}>Entrar</Button>
                  <Button onClick={handleGoToSignUp}>Cadastra-se</Button>
                </>
              )}
            </div>
          </nav>
          <span />
        </Menu>
      </Content>
    </Container>
  );
};

export default Header;
