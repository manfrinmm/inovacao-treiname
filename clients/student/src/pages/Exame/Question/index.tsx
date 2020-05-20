import React, { useState, useCallback } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

import { Container } from "./styles";

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

  const handleClickButton = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  return (
    <Container>
      <button type="button" onClick={handleClickButton}>
        {expanded ? <FaMinus size={24} /> : <FaPlus size={24} />}
        <h1>Questão {number + 1}</h1>
      </button>
    </Container>
  );
};

export default Question;
