import React from "react";

import { Container, Content, Option } from "./styles";

interface Props {
  number: number;
  question: {
    id: string;
    title: string;
    answer_a: string;
    answer_b: string;
    answer_c: string;
    answer_d: string;
    correct_answer: string;
    answer_mark: string;
  };
}

const Question: React.FC<Props> = ({ number, question }) => {
  return (
    <Container checked={question.answer_mark === question.correct_answer}>
      <h1>Questão {number + 1}</h1>
      <Content checked={question.answer_mark === question.correct_answer}>
        <p>{question.title}</p>
        <section>
          <Option
            correct_answer={question.correct_answer === "answer_a"}
            answer_mark={question.answer_mark === "answer_a"}
            checked={question.answer_mark === question.correct_answer}
          >
            <div>
              <label>{question.answer_a}</label>
            </div>
          </Option>
          <Option
            correct_answer={question.correct_answer === "answer_b"}
            answer_mark={question.answer_mark === "answer_b"}
            checked={question.answer_mark === question.correct_answer}
          >
            <div>
              <label>{question.answer_b}</label>
            </div>
          </Option>
          <Option
            correct_answer={question.correct_answer === "answer_c"}
            answer_mark={question.answer_mark === "answer_c"}
            checked={question.answer_mark === question.correct_answer}
          >
            <div>
              <label>{question.answer_c}</label>
            </div>
          </Option>
          <Option
            correct_answer={question.correct_answer === "answer_d"}
            answer_mark={question.answer_mark === "answer_d"}
            checked={question.answer_mark === question.correct_answer}
          >
            <div>
              <label>{question.answer_d}</label>
            </div>
          </Option>
        </section>
      </Content>
    </Container>
  );
};

export default Question;
