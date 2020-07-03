import React, { useCallback, useRef } from "react";
import { FaRegIdCard } from "react-icons/fa";
import { MdPerson, MdLock, MdContactPhone } from "react-icons/md";
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

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signUp } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Nome é obrigatório"),
          cpf: Yup.string().required("CPF é obrigatório"),
          rg: Yup.string().required("RG é obrigatório"),
          phone: Yup.string().required("Telefone é obrigatório"),
          password: Yup.string().min(
            6,
            "Senha deve conter no mínimo 6 dígitos",
          ),
        });

        await schema.validate(data, { abortEarly: false });

        await signUp(data);

        history.push("/");
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          toast.error("Erro ao criar o usuário. Favor, verifique os campos.");

          formRef.current?.setErrors(errors);
        }
      }
    },
    [signUp, history],
  );

  return (
    <Container>
      <h1>Criar sua conta</h1>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Input name="name" icon={MdPerson} placeholder="Digite seu nome" />
        <Input name="cpf" icon={FaRegIdCard} placeholder="Digite seu CPF" />
        <Input
          name="rg"
          icon={FaRegIdCard}
          placeholder="Seu RG com o Órgão Exp."
        />
        <Input
          name="phone"
          icon={MdContactPhone}
          placeholder="Digite seu telefone"
        />
        <Input
          name="password"
          icon={MdLock}
          type="password"
          placeholder="Digite sua senha"
        />
        <Button type="submit">Criar</Button>
      </Form>
    </Container>
  );
};

export default SignUp;
