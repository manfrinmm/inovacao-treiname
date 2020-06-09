import React, { useCallback } from "react";
import { MdPerson, MdLock } from "react-icons/md";

import { Form } from "@unform/web";

import Button from "~/components/Button";
import Input from "~/components/Input";
import { useAuth } from "~/hooks/auth";

import { Container } from "../styles";

const SignIn: React.FC = () => {
  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async data => {
      const { cpf, password } = data;

      try {
        await signIn({ cpf, password });
      } catch (error) {
        console.log(error);
      }
    },
    [signIn],
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
