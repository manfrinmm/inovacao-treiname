import React, { useCallback, useEffect } from "react";
import { FaRegIdCard } from "react-icons/fa";
import { MdPerson, MdLock, MdContactPhone } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { Form } from "@unform/web";

import Button from "~/components/Button";
import Input from "~/components/Input";
import { useAuth } from "~/hooks/auth";
import api from "~/services/api";

import { Container } from "./styles";

const SignIn: React.FC = () => {
  const { user } = useAuth();

  const history = useHistory();

  const handleSubmit = useCallback(
    async data => {
      const { password } = data;

      if (!password) {
        return;
      }

      try {
        await api.put(`/users/${user.id}`, { password });

        toast.success("Senha atualizada com sucesso!");

        history.push("/dashboard");
      } catch (error) {
        toast.error(
          "Houve um erro ao atualizar senha senha. Tente novamente mais tarde.",
        );
      }
    },
    [user.id, history],
  );

  return (
    <Container>
      <h1>Seus dados</h1>
      <Form onSubmit={handleSubmit} initialData={user}>
        <Input
          name="name"
          icon={MdPerson}
          placeholder="Digite seu CPF"
          disabled
        />
        <Input
          name="phone"
          icon={MdContactPhone}
          placeholder="Digite seu CPF"
          disabled
        />
        <Input
          name="rg"
          icon={FaRegIdCard}
          placeholder="Digite seu CPF"
          disabled
        />
        <Input
          name="cpf"
          icon={FaRegIdCard}
          placeholder="Digite seu CPF"
          disabled
        />
        <Input
          name="password"
          icon={MdLock}
          type="password"
          placeholder="Atualizar senha"
        />
        <Button type="submit">Atualizar perfil</Button>
      </Form>
    </Container>
  );
};

export default SignIn;
