import React, { useState, useRef, useEffect, useCallback } from "react";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";

import { Scope, FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import Button from "~/components/Button";
import Input from "~/components/Input";

import {
  Container,
  Title,
  StudentLearnContainer,
  StudentLearnContent,
} from "./styles";

const Course: React.FC = () => {
  const courseForm = useRef<FormHandles>(null);

  const [countStudentLearn, setCountStudentLearn] = useState([""]);
  // const [disableButtonStudentLearn, setDisableButtonStudentLearn] = useState(
  //   true,
  // );

  const handleAddStudentLearn = useCallback(() => {
    const inputValue = courseForm.current?.getFieldValue(
      `learns.${countStudentLearn.length - 1}`,
    );

    if (countStudentLearn.length === 1) {
      setCountStudentLearn([inputValue, ""]);
    } else {
      setCountStudentLearn(state => {
        const oldState = state;

        oldState[countStudentLearn.length - 1] = inputValue;

        return [...oldState, ""];
      });
    }
  }, [countStudentLearn]);

  // Verificar a remoção de um item antes do final do array
  const handleRemoveStudentLearn = useCallback(valueToRemove => {
    setCountStudentLearn(state =>
      state.filter(studentLearn => studentLearn !== valueToRemove),
    );
  }, []);

  // Preciso impedir adicionar mais inputs de `O que aprenderá` quando um estiver vazio
  // useEffect(() => {
  //   const checkInputValue = courseForm.current?.getFieldValue(
  //     `learns.${countStudentLearn.length - 1}`,
  //   );
  //   setDisableButtonStudentLearn(checkInputValue === "");
  // }, [
  //   courseForm.current?.getFieldValue(`learns.${countStudentLearn.length - 1}`),
  // ]);

  return (
    <Container>
      <Title>Cadastrar Curso</Title>
      <Form
        id="courseForm"
        ref={courseForm}
        onSubmit={data => {
          console.log(data);
        }}
      >
        <section>
          <Input
            name="name"
            title="Nome do curso"
            placeholder="Digite o nome"
          />
          <Input
            name="category"
            title="Categoria"
            placeholder="Digite a categoria"
          />
          <Input name="modality" title="Modalidade" type="select" />
          <Input
            name="workload"
            title="Carga horária"
            placeholder="Digite o número"
          />
          <Input
            name="value"
            title="Valor do curso"
            placeholder="Digite o valor"
          />
        </section>
        <section>
          <Input
            name="description"
            title="Descrição do curso"
            type="textarea"
            placeholder="Digite a descrição do curso"
          />
          <Input
            name="target_audience"
            title="Para quem este curso é direcionado"
            type="textarea"
            placeholder="Digite a descrição"
          />
          <Input
            name="thumbnail"
            title="Adicionar foto do curso"
            type="file"
            placeholder="Digite a descrição"
          />
        </section>
        <section>
          <Input
            name="course_expiration"
            title="Prazo (dias) de acesso do curso"
            placeholder="Digite o número em dias"
          />
          <Input
            name="certificate_validity"
            title="Validade (meses) do certificado"
            placeholder="Digite o número em meses"
          />
          <Input
            name="approved_by"
            title="Curso aprovado por"
            placeholder="Digite o nome"
          />
          <Input
            name="illustrative_video"
            title="Link de vídeo ilustrativo"
            placeholder="Link do vídeo"
          />
        </section>
        <Title>O que o aluno aprenderá</Title>
        <Scope path="learns">
          <StudentLearnContainer>
            {countStudentLearn.map((studentLearn, index) => (
              <StudentLearnContent key={Math.random()}>
                <Input
                  name={`${index}`}
                  title="O que aprenderá"
                  placeholder="Digite o nome"
                  defaultValue={studentLearn}
                />
                {countStudentLearn.length !== 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      handleRemoveStudentLearn(studentLearn);
                    }}
                  >
                    <FaRegTrashAlt size={20} />
                  </button>
                )}
              </StudentLearnContent>
            ))}

            <Button
              icon={FaPlus}
              onClick={handleAddStudentLearn}
              // disabled={disableButtonStudentLearn}
            />
          </StudentLearnContainer>
        </Scope>
      </Form>

      {}

      <Title>Módulos do curso</Title>

      <Button form="courseForm" type="submit">
        Cadastrar curso
      </Button>
    </Container>
  );
};

export default Course;
