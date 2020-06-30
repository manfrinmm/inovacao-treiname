import React, { useEffect, useRef, SelectHTMLAttributes } from "react";

import { useField } from "@unform/core";

import { Container, Error } from "./styles";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  title: string;
  name: string;
}

const Select: React.FC<SelectProps> = ({ title, name, ...rest }) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const { fieldName, registerField, error, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: "value",
    });
  }, [registerField, fieldName]);

  return (
    <Container>
      <label htmlFor={fieldName}>{title}</label>
      <select
        id={fieldName}
        ref={selectRef}
        defaultValue={defaultValue}
        {...rest}
      >
        <option value="Formação">Formação</option>
        <option value="Reciclagem">Reciclagem</option>
      </select>
      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default Select;
