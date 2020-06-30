import React from "react";
import { FaWhatsapp } from "react-icons/fa";

import { Container, Content } from "./styles";

const Footer: React.FC = () => {
  const telefone = "(64) 9-9606-7930";
  const email = "helijti@yahoo.com.br";

  return (
    <Container>
      <Content>
        <h3>Está com dúvidas? Entre em contato</h3>
        <section>
          <div>
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
          </div>
        </section>
      </Content>
    </Container>
  );
};

export default Footer;
