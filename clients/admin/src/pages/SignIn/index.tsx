import React, { useCallback, useRef } from "react";
import { toast } from "react-toastify";

import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";

import Button from "~/components/Button";
import Input from "~/components/Input";
import { useAuth } from "~/hooks/auth";
import getValidationErrors from "~/utils/getValidationErrors";

import { Container } from "./styles";

interface SignInFormData {
  cpf: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();

  const submitForm = useCallback(
    async (data: SignInFormData) => {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        cpf: Yup.string().required("Campo obrigatório"),
        password: Yup.string().required("Campo obrigatório"),
      });

      try {
        await schema.validate(data, { abortEarly: false });

        await signIn(data);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          toast.error("Erro ao fazer login. Favor, verifique os campos.");

          formRef.current?.setErrors(errors);
        }
      }
    },
    [signIn],
  );

  return (
    <Container>
      <Form onSubmit={submitForm} ref={formRef}>
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
