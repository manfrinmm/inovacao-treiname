import React, { useEffect, useRef, InputHTMLAttributes } from "react";

import { useField } from "@unform/core";

import { Container } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  name: string;
}

const Input: React.FC<InputProps> = ({ title, name, ...rest }) => {
  const inputRef = useRef(null);

  const { fieldName, registerField, error, defaultValue } = useField(name);

  if (error) console.log(error);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [registerField, fieldName]);

  return (
    <Container>
      <label htmlFor={fieldName}>{title}</label>
      <input
        type="text"
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
    </Container>
  );
};

export default Input;
