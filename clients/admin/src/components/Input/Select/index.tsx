import React, { useEffect, useRef, SelectHTMLAttributes } from "react";

import { useField } from "@unform/core";

import { Container } from "./styles";

interface OptionsProps {
  label: string;
  value: string;
}

interface InputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  title: string;
  name: string;
  options: OptionsProps[];
}

const Select: React.FC<InputProps> = ({ title, name, options, ...rest }) => {
  const inputRef = useRef(null);

  const { fieldName, registerField, error, defaultValue } = useField(name);

  if (error) {
    console.log(error);
  }

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
        <option value="">Selecione um curso</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default Select;
