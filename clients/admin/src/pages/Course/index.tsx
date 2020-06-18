import React, { useState, useRef, useEffect, useCallback } from "react";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { Scope, FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import merge from "lodash.merge";
import * as Yup from "yup";

import Button from "~/components/Button";
import Dropzone from "~/components/Dropzone";
import Input from "~/components/Input";
import Select from "~/components/Select";
import TextArea from "~/components/TextArea";
import api from "~/services/api";
import getValidationErrors from "~/utils/getValidationErrors";

import {
  Container,
  Title,
  StudentLearnContainer,
  StudentLearnContent,
  Modules,
  RemoveModuleButton,
  Module,
  AddModuleButton,
} from "./styles";

interface CourseModuleProps {
  id?: string;
  name: string;
  description: string;
  video_link: string;
  extra_link: string;
  file: string;
}

interface CourseFormData {
  name: string;
  category: string;
  modality: "Formação" | "Reciclagem";
  workload: string;
  value: string;
  description: string;
  target_audience: string;
  thumbnail: string;
  course_expiration: string;
  certificate_validity: string;
  approved_by: string;
  illustrative_video: string;
  practical_exam?: string;
  learns: Array<string>;
  modules: Array<CourseModuleProps>;
}

// Falta verificar o input de select (Não é modificado quando o dado vem pela API)
// Falta verificar o dropzone da thumbnail (Não aparece o nome do arquivo)
const Course: React.FC = () => {
  const courseForm = useRef<FormHandles>(null);
  const [courseFormData, setCourseFormData] = useState<CourseFormData>({
    name: "",
    category: "",
    workload: "",
    value: "",
    modality: "Formação",
    description: "",
    target_audience: "",
    thumbnail: "",
    course_expiration: "",
    certificate_validity: "",
    approved_by: "",
    illustrative_video: "",
    learns: [""],
    modules: [
      {
        name: "",
        description: "",
        video_link: "",
        extra_link: "",
        file: "",
      },
    ],
  });

  const { course_id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!course_id) {
      console.log("Problema.data");

      return;
    }

    api.get(`/courses/${course_id}`).then(response => {
      console.log("response.data", response.data);
      setCourseFormData(response.data);
      // courseForm.current?.setData(response.data);
      courseForm.current?.setFieldValue("modality", response.data.modality);
      courseForm.current?.setFieldValue("thumbnail", response.data.thumbnail);
      courseForm.current?.setFieldValue(
        "practical_exam",
        response.data.practical_exam,
      );
    });
  }, [course_id]);

  const getStudentLearnState = useCallback((): string[] => {
    const inputValues: string[] = [];

    for (let index = 0; index < courseFormData.learns.length; index++) {
      inputValues[index] = courseForm.current?.getFieldValue(`learns.${index}`);
    }

    return inputValues;
  }, [courseFormData.learns]);

  const getCourseModulesState = useCallback((): CourseModuleProps[] => {
    const inputValues: CourseModuleProps[] = [];

    for (let index = 0; index < courseFormData.modules.length; index++) {
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

      const module_id = courseFormData.modules[index].id;

      if (module_id) {
        Object.assign(inputValues[index], { id: module_id });
      }
    }

    return inputValues;
  }, [courseFormData.modules]);

  const handleRemovePracticalExam = useCallback(async () => {
    try {
      courseForm.current?.setFieldValue("practical_exam", undefined);

      const learns = getStudentLearnState();
      const modules = getCourseModulesState();

      setCourseFormData(state => ({
        ...state,
        modules,
        learns,
        practical_exam: undefined,
      }));

      toast.success("Exame prático removido com sucesso");
    } catch (error) {
      toast.error("Erro ao remover exame prático");
    }
  }, [getStudentLearnState, getCourseModulesState]);

  const handleAddStudentLearn = useCallback((): void => {
    const inputValues = getStudentLearnState();
    const modules = getCourseModulesState();

    setCourseFormData(state => ({
      ...state,
      modules,
      learns: [...inputValues, ""],
    }));
  }, [getStudentLearnState, getCourseModulesState]);

  const handleRemoveStudentLearn = useCallback(
    (indexToRemove: number): void => {
      const learnsInputValues = getStudentLearnState();
      const modules = getCourseModulesState();

      setCourseFormData(state => ({
        ...state,
        modules,
        learns: learnsInputValues.filter((_, index) => index !== indexToRemove),
      }));
    },
    [getStudentLearnState, getCourseModulesState],
  );

  const handleAddModule = useCallback(() => {
    const modules = getCourseModulesState();
    const learns = getStudentLearnState();

    setCourseFormData(state => ({
      ...state,
      learns,
      modules: [
        ...modules,
        { name: "", video_link: "", extra_link: "", description: "", file: "" },
      ],
    }));
  }, [getCourseModulesState, getStudentLearnState]);

  const handleRemoveModule = useCallback(
    async (indexToRemove: number) => {
      const modules = getCourseModulesState();
      const learns = getStudentLearnState();

      const module_id = modules[indexToRemove].id;

      if (module_id) {
        await api.delete(`/modules/${module_id}`);
        toast.success("Modulo deletado.");
      }

      setCourseFormData(state => ({
        ...state,
        learns,
        modules: modules.filter((_, index) => index !== indexToRemove),
      }));
    },
    [getCourseModulesState, getStudentLearnState],
  );

  const handleSubmit = useCallback(
    async (data: CourseFormData) => {
      try {
        courseForm.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Nome é obrigatório"),
          category: Yup.string().required("Categoria é obrigatório."),
          modality: Yup.string().required("Modalidade é obrigatório."),
          workload: Yup.string().required("Carga horária é obrigatório."),
          value: Yup.string().required("Valor é obrigatório."),
          description: Yup.string().required("Descrição é obrigatório."),
          target_audience: Yup.string().required("Este campo é obrigatório."),
          thumbnail: Yup.string().required("Thumbnail é obrigatório."),
          course_expiration: Yup.string().required("Prazo é obrigatório."),
          certificate_validity: Yup.string().required(
            "Validade é obrigatório.",
          ),
          approved_by: Yup.string().required("Aprovado por é obrigatório."),
          illustrative_video: Yup.string(),
          learns: Yup.array(Yup.string().required()).required("é obrigatório."),
          modules: Yup.array(
            Yup.object().shape({
              name: Yup.string().required("Nome é obrigatório."),
              description: Yup.string().required("Descrição é obrigatório."),
              video_link: Yup.string(),
              extra_link: Yup.string(),
              file: Yup.string().required("Matérial é obrigatório."),
            }),
          ),
        });

        await schema.validate(data, { abortEarly: false });

        if (course_id) {
          const courseData = merge(courseFormData, data);
          await api.put(`/courses/${course_id}`, courseData);
          console.log("courseData", courseData);
          toast.success("Curso atualizado com sucesso");

          // history.push("/dashboard");
        } else {
          await api.post("/courses", data);

          toast.success("Curso criado com sucesso");

          history.push("/dashboard");
        }
      } catch (err) {
        const messageCourse = course_id ? "atualizar" : "criar";

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          toast.error(
            `Erro ao ${messageCourse} o curso. Favor, verifique os campos.`,
          );

          courseForm.current?.setErrors(errors);

          return;
        }

        toast.error(
          `Erro ao ${messageCourse} o curso. Favor, tente novamente.`,
        );
      }
    },
    [courseFormData, history, course_id],
  );

  return (
    <Container>
      <Title>Cadastrar Curso</Title>
      <Form
        id="courseForm"
        ref={courseForm}
        onSubmit={handleSubmit}
        initialData={courseFormData}
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
          <Dropzone
            title="Adicionar foto do curso"
            name="thumbnail"
            accept="image/*"
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

        <section>
          <div>
            {courseFormData.practical_exam && (
              <RemoveModuleButton
                icon={FaRegTrashAlt}
                onClick={handleRemovePracticalExam}
              >
                Remover prova
              </RemoveModuleButton>
            )}
            <Dropzone
              name="practical_exam"
              title="Instruções de prova prática - Campo não obrigatório"
            />
          </div>
        </section>
        <Title>O que o aluno aprenderá</Title>
        <Scope path="learns">
          <StudentLearnContainer>
            {courseFormData.learns.map((_, index) => (
              <StudentLearnContent key={Math.random()}>
                <Input
                  name={`${index}`}
                  title="O que aprenderá"
                  placeholder="Digite o nome"
                />
                {courseFormData.learns.length !== 1 && (
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
          {courseFormData.modules.map((_, index) => (
            <Scope path={`modules[${index}]`} key={Math.random()}>
              {courseFormData.modules.length !== 1 && (
                <RemoveModuleButton
                  icon={FaRegTrashAlt}
                  onClick={() => {
                    handleRemoveModule(index);
                  }}
                >
                  Remover modulo
                </RemoveModuleButton>
              )}
              <Module>
                <section>
                  <Input
                    name="name"
                    title="Nome do modulo"
                    placeholder="Digite o nome"
                  />
                  <Input
                    name="video_link"
                    type="url"
                    title="Link da aula"
                    placeholder="Digite o link"
                  />
                  <Input
                    name="extra_link"
                    type="url"
                    title="Link extra"
                    placeholder="Digite o link"
                  />
                </section>
                <TextArea
                  name="description"
                  title="Descrição do modulo"
                  placeholder="Digite a descrição do modulo"
                />
                <Dropzone title="Adicionar material" name="file" />
              </Module>
            </Scope>
          ))}
        </Modules>
        <AddModuleButton icon={FaPlus} onClick={handleAddModule}>
          Adicionar modulo
        </AddModuleButton>
      </Form>

      <Button form="courseForm" type="submit">
        {course_id ? "Atualizar" : "Cadastrar"} curso
      </Button>
    </Container>
  );
};

export default Course;
