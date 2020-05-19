import React from "react";
import { Link } from "react-router-dom";

import logo from "~/assets/logo.svg";
import Button from "~/components/Button";

import { Container, Content } from "./styles";

const Header: React.FC = () => {
  return (
    <Container>
      <Content>
        <Link to="/dashboard">
          <img src={logo} alt="Inovação Treinamentos" />
        </Link>

        <section>
          <div>
            <p>Matheus Menezes Manfrin</p>
            <span>123.456.254-25</span>
          </div>
          <Button>Sair</Button>
        </section>
      </Content>
    </Container>
  );
};

export default Header;
