import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import { Form } from "@unform/web";

import Button from "~/components/Button";
import Input from "~/components/Input";

import { Container } from "./styles";

const Certification: React.FC = () => {
  const history = useHistory();

  const handleSubmit = useCallback(
    data => {
      const certification_id = data.code;
      history.push(`certification/${certification_id}`);
    },
    [history],
  );

  return (
    <Container>
      <h1>Certificado Inovação Treinamentos</h1>
      <Form onSubmit={handleSubmit}>
        <Input name="code" placeholder="Digite o código do certificado" />
        <Button type="submit">Verificar autenticidade</Button>
      </Form>
    </Container>
  );
};

export default Certification;
