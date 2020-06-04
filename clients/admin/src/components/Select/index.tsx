import React, { useEffect, useRef, SelectHTMLAttributes } from "react";

import { useField } from "@unform/core";

import { Container } from "./styles";

interface InputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  title: string;
  name: string;
}

const Select: React.FC<InputProps> = ({ title, name, ...rest }) => {
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
      <select
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      >
        <option value="Formação">Formação</option>
        <option value="Reciclagem">Reciclagem</option>
      </select>
    </Container>
  );
};

export default Select;
