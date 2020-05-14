import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

import { Container, Content } from "./styles";

const Footer: React.FC = () => {
  const telefone = "(64) 9-9960-6793";
  const email = "helijti@yahoo.com.br";

  return (
    <Container>
      <Content>
        <section>
          <h2>Entre em Contato</h2>
          <p>
            Telefone:
            <a
              href={`https://api.whatsapp.com/send?phone=+55${telefone}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>
                {telefone} <FaWhatsapp size={20} />
              </strong>
            </a>
          </p>
          <p>
            E-mail:
            <strong>
              <a href={`mailto:${email}`}> {email}</a>
            </strong>
          </p>
        </section>
        <section>
          <h2>Cursos</h2>
          <Link to="/">Página de cursos</Link>
        </section>
        <section>
          <h2>Certificados</h2>
          <Link to="/certification">Verificar certificação</Link>
        </section>
        <section>
          <h2>Dados Jurídicos</h2>
          <p>
            Resumo da Atividade: <strong>Programador</strong>
          </p>
          <p>
            CNPJ: <strong>28.619.060/0001-06</strong>
          </p>
        </section>
      </Content>
    </Container>
  );
};

export default Footer;
