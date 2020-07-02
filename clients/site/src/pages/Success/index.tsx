import React from "react";
import { FiCheckCircle, FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";

import { Container, MessageSuccess, Buttons } from "./styles";

const Success: React.FC = () => {
  return (
    <Container>
      <main>
        <div>
          <MessageSuccess>
            <div>
              <p>Pedido de compra submetido com sucesso.</p>
              <p>
                Assim que constar o pagamento do curso, o administrador irá
                liberar o acesso para você. <br /> Você poderá acessar o curso
                na plataforma do estudante.
              </p>

              <FiCheckCircle />
            </div>
          </MessageSuccess>
          <Buttons>
            <Link to="/">Voltar para tela inicial</Link>
            <a
              href={String(process.env.REACT_APP_SITE_STUDENT_URL)}
              target="__blank"
            >
              <FiLogIn size={20} /> <p> Acessar plataforma do estudante </p>
            </a>
          </Buttons>
        </div>
      </main>
    </Container>
  );
};

export default Success;
