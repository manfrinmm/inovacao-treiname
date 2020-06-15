import React, { useCallback } from "react";
import { MdPerson, MdLock } from "react-icons/md";
import { useHistory } from "react-router-dom";

import { Form } from "@unform/web";

import Button from "~/components/Button";
import Input from "~/components/Input";
import { useAuth } from "~/hooks/auth";

import { Container } from "../styles";

const SignIn: React.FC = () => {
  const { signIn } = useAuth();

  const history = useHistory();

  const handleSubmit = useCallback(
    async data => {
      const { cpf, password } = data;

      await signIn({ cpf, password });
      history.push("/");
    },
    [signIn, history],
  );

  return (
    <Container>
      <h1>Acessar sua conta</h1>
      <Form onSubmit={handleSubmit}>
        <Input name="cpf" icon={MdPerson} placeholder="Digite seu CPF" />
        <Input
          name="password"
          icon={MdLock}
          type="password"
          placeholder="Digite sua senha"
        />
        <Button type="submit">Entrar</Button>
      </Form>
    </Container>
  );
};

export default SignIn;
