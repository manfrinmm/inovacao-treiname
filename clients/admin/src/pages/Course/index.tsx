import React, { useState, useRef, useEffect, useCallback } from "react";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";

import { Scope, FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import Button from "~/components/Button";
import Input from "~/components/Input";
import Select from "~/components/Select";
import TextArea from "~/components/TextArea";

import {
  Container,
  Title,
  StudentLearnContainer,
  StudentLearnContent,
  Modules,
  Module,
} from "./styles";

interface CourseModuleProps {
  name: string;
  description: string;
  video_link: string;
  extra_link: string;
  file?: string;
}

const Course: React.FC = () => {
  const courseForm = useRef<FormHandles>(null);

  const [countStudentLearn, setCountStudentLearn] = useState([""]);
  const [courseModules, setCourseModules] = useState<CourseModuleProps[]>([
    {
      name: "",
      video_link: "",
      extra_link: "",
      description: "",
    },
  ]);

  const getStudentLearnState = useCallback((): string[] => {
    const inputValues: string[] = [];

    for (let index = 0; index < countStudentLearn.length; index++) {
      inputValues[index] = courseForm.current?.getFieldValue(`learns.${index}`);
    }

    return inputValues;
  }, [countStudentLearn]);

  const handleAddStudentLearn = useCallback((): void => {
    const inputValues = getStudentLearnState();

    setCountStudentLearn([...inputValues, ""]);
  }, [getStudentLearnState]);

  const handleRemoveStudentLearn = useCallback(
    (indexToRemove: number): void => {
      const inputValues = getStudentLearnState();

      setCountStudentLearn(
        inputValues.filter((_, index) => index !== indexToRemove),
      );
    },
    [getStudentLearnState],
  );

  const getCourseModulesState = useCallback((): CourseModuleProps[] => {
    const inputValues: CourseModuleProps[] = [];

    for (let index = 0; index < courseModules.length; index++) {
      const name = courseForm.current?.getFieldValue(`modules[${index}].name`);

      const video_link = courseForm.current?.getFieldValue(
        `modules[${index}].video_link`,
      );
      const extra_link = courseForm.current?.getFieldValue(
        `modules[${index}].extra_link`,
      );
      const description = courseForm.current?.getFieldValue(
        `modules[${index}].description`,
      );
      const file = courseForm.current?.getFieldValue(`modules[${index}].file`);

      inputValues[index] = {
        name,
        video_link,
        extra_link,
        description,
        file,
      };
    }
    console.log(inputValues);

    return inputValues;
  }, [courseModules]);

  const handleAddModule = useCallback(() => {
    const modules = getCourseModulesState();

    setCourseModules([
      ...modules,
      {
        name: "",
        video_link: "",
        extra_link: "",
        description: "",
      },
    ]);
  }, [getCourseModulesState]);

  const handleRemoveModule = useCallback(
    (indexToRemove: number) => {
      const modules = getCourseModulesState();

      setCourseModules(modules.filter((_, index) => index !== indexToRemove));
    },
    [getCourseModulesState],
  );

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
          <Select name="modality" title="Modalidade" />
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
          <TextArea
            name="description"
            title="Descrição do curso"
            placeholder="Digite a descrição do curso"
          />
          <TextArea
            name="target_audience"
            title="Para quem este curso é direcionado"
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
                      handleRemoveStudentLearn(index);
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

        <Title>Módulos do curso</Title>
        <Modules>
          {courseModules.map((module, index) => (
            <Scope path={`modules[${index}]`} key={Math.random()}>
              <Button
                icon={FaRegTrashAlt}
                onClick={() => {
                  handleRemoveModule(index);
                }}
              >
                Remover modulo
              </Button>
              <Module>
                <section>
                  <Input
                    name="name"
                    title="Nome do modulo"
                    placeholder="Digite o nome"
                    defaultValue={module.name}
                  />
                  <Input
                    name="video_link"
                    type="url"
                    title="Link da aula"
                    placeholder="Digite o link"
                    defaultValue={module.video_link}
                  />
                  <Input
                    name="extra_link"
                    type="url"
                    title="Link extra"
                    placeholder="Digite o link"
                    defaultValue={module.extra_link}
                  />
                </section>
                <TextArea
                  name="description"
                  title="Descrição do modulo"
                  placeholder="Digite a descrição do modulo"
                  defaultValue={module.description}
                />
                <Input title="Adicionar material" name="file" type="file" />
              </Module>
            </Scope>
          ))}
        </Modules>
        <Button icon={FaPlus} onClick={handleAddModule}>
          Adicionar modulo
        </Button>
      </Form>

      <Button form="courseForm" type="submit">
        Cadastrar curso
      </Button>
    </Container>
  );
};

export default Course;
