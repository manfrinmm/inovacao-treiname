import React, { useEffect, useRef, InputHTMLAttributes } from "react";

import { useField } from "@unform/core";

import { Container } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<InputProps> = ({ name, ...rest }) => {
  const inputRef = useRef(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  error && console.log(error);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [registerField, fieldName]);

  return (
    <Container>
      <input ref={inputRef} type="text" {...rest} defaultValue={defaultValue} />
    </Container>
  );
};

export default Input;
