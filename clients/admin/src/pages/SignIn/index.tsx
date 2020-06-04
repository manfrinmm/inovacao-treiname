import React, { useCallback } from "react";

import { Form } from "@unform/web";

import Button from "~/components/Button";
import Input from "~/components/Input";
import { useAuth } from "~/hooks/auth";

import { Container } from "./styles";

interface SignInFormData {
  cpf: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { signIn } = useAuth();

  const submitForm = useCallback(
    async (data: SignInFormData) => {
      await signIn(data);
    },
    [signIn],
  );

  return (
    <Container>
      <Form onSubmit={submitForm}>
        <Input title="CPF" name="cpf" placeholder="Digite seu cpf" />
        <Input
          title="Senha"
          name="password"
          placeholder="Digite sua senha"
          type="password"
        />
        <Button type="submit">Logar</Button>
      </Form>
    </Container>
  );
};

export default SignIn;
