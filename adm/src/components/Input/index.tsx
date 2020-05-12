import React, { InputHTMLAttributes } from "react";

import { Container } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

const Input: React.FC<InputProps> = ({ title, ...rest }) => {
  return (
    <Container>
      <label htmlFor={title}>{title}</label>
      <input type="text" id={title} {...rest} />
    </Container>
  );
};

export default Input;
