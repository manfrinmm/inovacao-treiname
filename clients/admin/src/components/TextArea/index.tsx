import React, { useEffect, useRef, TextareaHTMLAttributes } from "react";

import { useField } from "@unform/core";

import { Container } from "./styles";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  title: string;
  name: string;
}

const TextArea: React.FC<TextAreaProps> = ({ title, name, ...rest }) => {
  const textAreaRef = useRef(null);

  const { fieldName, registerField, error, defaultValue } = useField(name);

  if (error) console.log(error);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textAreaRef.current,
      path: "value",
    });
  }, [registerField, fieldName]);

  return (
    <Container>
      <label htmlFor={fieldName}>{title}</label>
      <textarea
        id={fieldName}
        ref={textAreaRef}
        defaultValue={defaultValue}
        {...rest}
      />
    </Container>
  );
};

export default TextArea;
