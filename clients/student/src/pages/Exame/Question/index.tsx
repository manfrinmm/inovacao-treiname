import React, { useState, useCallback } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

import Radio from "~/components/Input/Radio";

import { Container, Content, Option } from "./styles";

interface Props {
  isErrored: boolean;
  number: number;
  question: {
    id: string;
    title: string;
    answer_a: string;
    answer_b: string;
    answer_c: string;
    answer_d: string;
  };
}

const Question: React.FC<Props> = ({ number, question, isErrored }) => {
  const [expanded, setExpanded] = useState(true);

  const handleClickButton = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  return (
    <Container isErrored={isErrored}>
      <button type="button" onClick={handleClickButton}>
        {expanded ? <FaMinus size={24} /> : <FaPlus size={24} />}
        <h1>Questão {number + 1}</h1>
      </button>
      <Content expanded={expanded}>
        <p>{question.title}</p>
        <section>
          <Option>
            <div>
              <label>
                <Radio value="answer_a" name="answer_mark" label="A" />
                {question.answer_a}
              </label>
            </div>
          </Option>
          <Option>
            <div>
              <label>
                <Radio value="answer_b" name="answer_mark" label="B" />
                {question.answer_b}
              </label>
            </div>
          </Option>
          <Option>
            <div>
              <label>
                <Radio value="answer_c" name="answer_mark" label="C" />
                {question.answer_c}
              </label>
            </div>
          </Option>
          <Option>
            <div>
              <label>
                <Radio value="answer_d" name="answer_mark" label="D" />
                {question.answer_d}
              </label>
            </div>
          </Option>
        </section>
      </Content>
    </Container>
  );
};

export default Question;
