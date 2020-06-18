import React, { useCallback, useRef } from "react";
import { MdPerson, MdLock } from "react-icons/md";
import { toast } from "react-toastify";

import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";

import Button from "~/components/Button";
import Input from "~/components/Input";
import { useAuth } from "~/hooks/auth";
import getValidationErrors from "~/utils/getValidationErrors";

import { Container } from "../styles";

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async data => {
      const { cpf, password } = data;
      formRef.current?.setErrors({});

      try {
        const schema = Yup.object().shape({
          cpf: Yup.string().required("CPF é obrigatório"),
          password: Yup.string().required("Senha é obrigatória"),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({ cpf, password });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          toast.error("Erro ao fazer login. Favor, verifique os campos");
        }
      }
    },
    [signIn],
  );

  return (
    <Container>
      <h1>Acessar sua conta</h1>
      <Form onSubmit={handleSubmit} ref={formRef}>
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
