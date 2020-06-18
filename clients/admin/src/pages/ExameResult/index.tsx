import React, { useState, useEffect } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useHistory, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

import api from "~/services/api";

import Question from "./Question";
import { Container } from "./styles";

interface ExameData {
  accuracy: number;
  made_on_date: Date;
  made_on_date_formatted: string;
  questions: Array<{
    id: string;
    title: string;
    answer_a: string;
    answer_b: string;
    answer_c: string;
    answer_d: string;
    correct_answer: string;
    answer_mark: string;
  }>;
}

interface ExameDataResponse
  extends Omit<ExameData, "made_on_date" | "made_on_date_formatted"> {
  created_at: string;
}

const ExameResult: React.FC = () => {
  const [examResult, setExamResult] = useState({} as ExameData);

  const history = useHistory();
  const { submit_id } = useParams();

  useEffect(() => {
    async function loadExam(): Promise<void> {
      try {
        const response = await api.get<ExameDataResponse>(
          `/admins/exams/${submit_id}/result`,
        );

        const { questions, accuracy, created_at } = response.data;

        if (!questions) {
          throw new Error();
        }

        const made_on_date = new Date(created_at);
        const made_on_date_formatted = new Date(created_at).toLocaleString();

        setExamResult({
          questions,
          accuracy,
          made_on_date,
          made_on_date_formatted,
        });
      } catch (error) {
        toast.error("Falha ao pegar os dados da prova.");
        history.push("/dashboard");
      }
    }

    loadExam();
  }, [history, submit_id]);

  return (
    <Container>
      <header>
        <Link to="/dashboard">
          <MdKeyboardArrowLeft /> Voltar para o dashboard
        </Link>

        <h1>Resultado da Prova</h1>
        <div>
          <h3>Data da realização {examResult.made_on_date_formatted}</h3>
          <span>
            Porcentagem de acerto
            <strong> {(examResult.accuracy * 100).toFixed(2)}%</strong>
          </span>
        </div>
      </header>
      <section>
        {examResult.questions?.map((question, index) => (
          <Question key={question.id} number={index} question={question} />
        ))}
      </section>
    </Container>
  );
};

export default ExameResult;
