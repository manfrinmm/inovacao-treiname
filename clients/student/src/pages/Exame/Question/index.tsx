import React, { useState, useCallback, Ref, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

import { FormHandles } from "@unform/core";

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
  const [selected, setSelect] = useState("");

  const handleClickButton = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  return (
    <Container selected={selected !== ""} isErrored={isErrored}>
      <button type="button" onClick={handleClickButton}>
        {expanded ? <FaMinus size={24} /> : <FaPlus size={24} />}
        <h1>Questão {number + 1}</h1>
      </button>
      <Content expanded={expanded}>
        <p>{question.title}</p>
        <section>
          <Option checked={selected === question.answer_a}>
            <div>
              {/* <label htmlFor={question.answer_a}>
                  A
                  <input
                    name={question.id}
                    type="radio"
                    id={question.answer_a}
                    onChange={() => {
                      setSelect(question.answer_a);
                    }}
                    checked={selected === question.answer_a}
                  />
                </label> */}
              <label>
                <Radio value="answer_a" name="answer_mark" label="A" />
                {question.answer_a}
              </label>
            </div>
          </Option>
          <Option checked={selected === question.answer_b}>
            <div>
              {/* <label htmlFor={question.answer_b}>
                  B
                  <input
                    name={question.id}
                    type="radio"
                    id={question.answer_b}
                    onChange={() => {
                      setSelect(question.answer_b);
                    }}
                    checked={selected === question.answer_b}
                  />
                </label> */}
              <label>
                <Radio value="answer_b" name="answer_mark" label="B" />
                {question.answer_b}
              </label>
            </div>
          </Option>
          <Option checked={selected === question.answer_c}>
            <div>
              {/* <label htmlFor={question.answer_c}>
                  C
                  <input
                    name={question.id}
                    type="radio"
                    id={question.answer_c}
                    onChange={() => {
                      setSelect(question.answer_c);
                    }}
                    checked={selected === question.answer_c}
                  />
                </label> */}

              <label>
                <Radio value="answer_c" name="answer_mark" label="C" />
                {question.answer_c}
              </label>
            </div>

            {/* <label htmlFor={question.answer_c}>{question.answer_c}</label> */}
          </Option>
          <Option checked={selected === question.answer_d}>
            <div>
              {/* <label htmlFor={question.answer_d}>
                  D
                  <input
                    name={question.id}
                    type="radio"
                    id={question.answer_d}
                    onChange={() => {
                      setSelect(question.answer_d);
                    }}
                    checked={selected === question.answer_d}
                  />
                </label> */}

              <label>
                <Radio value="answer_d" name="answer_mark" label="D" />
                {question.answer_d}
              </label>
            </div>

            {/* <label htmlFor={question.answer_d}>{question.answer_d}</label> */}
          </Option>
        </section>
      </Content>
    </Container>
  );
};

export default Question;
