import React, { useState, useEffect, useCallback, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Scope, FormHandles } from "@unform/core";
import { Form } from "@unform/web";

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
  const formRef = useRef<FormHandles>(null);

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

      console.log(data);
      const answersMarked = data.question.map((question: any) => {
        const value = Object.values(question).find(item => item !== null);

        return { answer_mark: value };
      });
      console.log("answersMarked", answersMarked);

      const questions = answersMarked;

      const formattedData = {
        course_id,
        questions,
      };
      console.log(formattedData);

      try {
        const response = await api.post("/users/exams/submit", formattedData);

        console.log(response.data);

        toast.dismiss(toastInfo);
        toast.success(
          "Prova submetida com sucesso, você poderá ver seu resultado em breve.",
        );

        history.push("/dashboard");
      } catch (error) {
        toast.dismiss(toastInfo);
        toast.error("Erro ao submeter prova. Por favor, tente novamente.");
      }
    },
    [history, course_id],
  );

  useEffect(() => {
    async function loadExam(): Promise<void> {
      const response = await api.get(`/users/courses/${course_id}/exams`);

      const { name, questions } = response.data;

      setExam({ name, questions });
    }

    loadExam();
  }, [course_id]);

  return (
    <Container>
      <h1>{exame.name}</h1>
      <Form id="exameForm" ref={formRef} onSubmit={handleSubmit}>
        <section>
          {exame.questions?.map((question, index) => (
            <Scope path={`question[${index}]`} key={question.id}>
              <Question number={index} question={question} formRef={formRef} />
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
