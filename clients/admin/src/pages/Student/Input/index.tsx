import React, { useEffect, useRef, InputHTMLAttributes } from "react";

import { useField } from "@unform/core";

import { Container, Error } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  name: string;
}

const Input: React.FC<InputProps> = ({ title, name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { registerField, fieldName, error, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [registerField, fieldName]);

  return (
    <Container isErrored={!!error}>
      <label>
        {title}
        <input
          type="text"
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
        />
      </label>

      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default Input;
