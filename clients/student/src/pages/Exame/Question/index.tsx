import React, { useState, useCallback } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

import { Container, Option } from "./styles";

interface Props {
  number: number;
  question: {
    id: string;
    title: string;
    a: string;
    b: string;
    c: string;
    d: string;
  };
}

const Question: React.FC<Props> = ({ number, question }) => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelect] = useState("");

  const handleClickButton = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  return (
    <Container selected={selected !== ""}>
      <button type="button" onClick={handleClickButton}>
        {expanded ? <FaMinus size={24} /> : <FaPlus size={24} />}
        <h1>Questão {number + 1}</h1>
      </button>
      {expanded && (
        <div>
          <p>{question.title}</p>

          <section>
            <Option checked={selected === question.a}>
              <div>
                <label htmlFor={question.a}>
                  A
                  <input
                    name={question.id}
                    type="radio"
                    id={question.a}
                    onChange={() => {
                      setSelect(question.a);
                    }}
                    checked={selected === question.a}
                  />
                </label>
              </div>
              <label htmlFor={question.a}>{question.a}</label>
            </Option>
            <Option checked={selected === question.b}>
              <div>
                <label htmlFor={question.b}>
                  B
                  <input
                    name={question.id}
                    type="radio"
                    id={question.b}
                    onChange={() => {
                      setSelect(question.b);
                    }}
                    checked={selected === question.b}
                  />
                </label>
              </div>

              <label htmlFor={question.b}>{question.b}</label>
            </Option>
            <Option checked={selected === question.c}>
              <div>
                <label htmlFor={question.c}>
                  C
                  <input
                    name={question.id}
                    type="radio"
                    id={question.c}
                    onChange={() => {
                      setSelect(question.c);
                    }}
                    checked={selected === question.c}
                  />
                </label>
              </div>

              <label htmlFor={question.c}>{question.c}</label>
            </Option>
            <Option checked={selected === question.d}>
              <div>
                <label htmlFor={question.d}>
                  D
                  <input
                    name={question.id}
                    type="radio"
                    id={question.d}
                    onChange={() => {
                      setSelect(question.d);
                    }}
                    checked={selected === question.d}
                  />
                </label>
              </div>

              <label htmlFor={question.d}>{question.d}</label>
            </Option>
          </section>
        </div>
      )}
    </Container>
  );
};

export default Question;
