import React, { useCallback, useRef } from "react";
import { FiLogIn } from "react-icons/fi";
import { MdPerson, MdLock } from "react-icons/md";
import { useHistory } from "react-router-dom";
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

  const history = useHistory();

  const handleSubmit = useCallback(
    async data => {
      const { cpf, password } = data;

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          cpf: Yup.string().required("CPF é obrigatório"),
          password: Yup.string().required("Senha necessária"),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({ cpf, password });
        history.push("/");
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          toast.error("Erro ao fazer login. Favor, verifique os campos.");

          formRef.current?.setErrors(errors);
        }
      }
    },
    [signIn, history],
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

      <a href={String(process.env.REACT_APP_SITE_STUDENT_URL)} target="__blank">
        <FiLogIn size={20} /> <p> Acessar plataforma do estudante </p>
      </a>
    </Container>
  );
};

export default SignIn;
