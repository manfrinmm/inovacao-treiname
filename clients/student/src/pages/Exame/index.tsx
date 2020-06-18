import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Scope } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";

import Button from "~/components/Button";
import api from "~/services/api";

import Question from "./Question";
import { Container } from "./styles";

interface ExameData {
  name: string;
  questions: Array<{
    id: string;
    title: string;
    answer_a: string;
    answer_b: string;
    answer_c: string;
    answer_d: string;
  }>;
}

const Exame: React.FC = () => {
  const [exame, setExam] = useState({} as ExameData);
  const [questionsErrors, setQuestionsErros] = useState<string[]>([]);

  const history = useHistory();
  const { course_id } = useParams();

  const handleSubmit = useCallback(
    async data => {
      const toastInfo = toast.info(
        "Enviando os dados da sua prova. Por favor, aguarde...",
        {
          autoClose: false,
        },
      );

      setQuestionsErros([]);

      const answersMarked = data.question.map((question: any) => {
        const value = Object.values(question).find(item => item !== null);

        return { answer_mark: value };
      });

      const questions = answersMarked;

      const formattedData = {
        course_id,
        questions,
      };

      try {
        const schema = Yup.object().shape({
          course_id: Yup.string().required(),
          questions: Yup.array().of(
            Yup.object().shape({
              answer_mark: Yup.string()
                .oneOf(["answer_a", "answer_b", "answer_c", "answer_d"])
                .required(),
            }),
          ),
        });

        await schema.validate(formattedData, { abortEarly: false });

        await api.post("/users/exams/submit", formattedData);

        toast.dismiss(toastInfo);
        toast.success(
          "Prova submetida com sucesso, você poderá ver seu resultado em breve.",
        );

        history.push("/dashboard");
      } catch (error) {
        toast.dismiss(toastInfo);

        if (error instanceof Yup.ValidationError) {
          setQuestionsErros(error.inner.map(err => err.path.split(".")[0]));

          toast.error(
            "Erro ao submeter prova. Favor, verifique se marcou todas as questões.",
          );
        }
      }
    },
    [history, course_id],
  );

  useEffect(() => {
    async function loadExam(): Promise<void> {
      try {
        const response = await api.get(`/users/courses/${course_id}/exams`);

        const { name, questions } = response.data;

        setExam({ name, questions });
      } catch (error) {
        toast.error("Erro ao carregar informações da prova.");

        history.goBack();
      }
    }

    loadExam();
  }, [course_id, history]);

  return (
    <Container>
      <h1>{exame.name}</h1>
      <Form id="exameForm" onSubmit={handleSubmit}>
        <section>
          {exame.questions?.map((question, index) => (
            <Scope path={`question[${index}]`} key={question.id}>
              <Question
                number={index}
                question={question}
                isErrored={questionsErrors.includes(`questions[${index}]`)}
              />
            </Scope>
          ))}
        </section>
      </Form>

      <Button type="submit" form="exameForm">
        Submeter prova
      </Button>

      <p>
        QUAL MENSAGEM COLOCAR?
        <br />
        Caso tenha conseguido menção <strong>SATISFATÓRIA</strong> você recebera
        seu certificado.
      </p>
    </Container>
  );
};

export default Exame;
