import React, { useEffect, useRef, TextareaHTMLAttributes } from "react";

import { useField } from "@unform/core";

import { Container, Error } from "./styles";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  title: string;
  name: string;
}

const TextArea: React.FC<TextAreaProps> = ({ title, name, ...rest }) => {
  const textAreaRef = useRef(null);

  const { fieldName, registerField, error, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textAreaRef.current,
      path: "value",
      setValue(ref, inputValue) {
        console.log("inputValue", inputValue);

        ref.value = inputValue;
      },
    });
  }, [registerField, fieldName]);

  return (
    <Container isErrored={!!error}>
      <label htmlFor={fieldName}>{title}</label>
      <textarea
        id={fieldName}
        ref={textAreaRef}
        defaultValue={defaultValue}
        {...rest}
      />

      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default TextArea;
