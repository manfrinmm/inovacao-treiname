import React from "react";
import { Link } from "react-router-dom";

import logo from "~/assets/logo.svg";
import Button from "~/components/Button";
import { useAuth } from "~/hooks/auth";

import { Container, Content } from "./styles";

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <Content>
        <Link to="/dashboard">
          <img src={logo} alt="Inovação Treinamentos" />
        </Link>

        <section>
          <div>
            <p>{user?.name}</p>
            <span>{user?.cpf}</span>
          </div>
          <Button onClick={signOut}>Sair</Button>
        </section>
      </Content>
    </Container>
  );
};

export default Header;
