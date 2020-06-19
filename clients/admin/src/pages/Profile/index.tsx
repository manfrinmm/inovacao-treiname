import React, { useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";

import Button from "~/components/Button";
import Input from "~/components/Input";
import api from "~/services/api";
import getValidationErrors from "~/utils/getValidationErrors";

import { Container } from "./styles";

interface SignInFormData {
  cpf: string;
  password: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const submitForm = useCallback(
    async (data: SignInFormData) => {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        cpf: Yup.string().required("Campo obrigatório"),
        password: Yup.string(),
      });

      try {
        await schema.validate(data, { abortEarly: false });

        await api.put("/admins/update", data);

        toast.success("Dados atualizados com sucesso.");

        history.push("/dashboard");
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          toast.error("Erro ao atualizar dados. Favor, verifique os campos.");

          formRef.current?.setErrors(errors);

          return;
        }

        toast.error("Erro ao atualizar dados. Favor, tente novamente.");
      }
    },
    [history],
  );

  return (
    <Container>
      <Form onSubmit={submitForm} ref={formRef}>
        <Input title="CPF" name="cpf" placeholder="Digite seu cpf" />
        <Input
          title="Nova senha"
          name="password"
          placeholder="Digite a nova senha"
          type="password"
        />
        <Button type="submit">Atualizar perfil</Button>
      </Form>
    </Container>
  );
};

export default Profile;
