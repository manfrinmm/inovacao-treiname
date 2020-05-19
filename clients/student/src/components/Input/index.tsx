import React, { useRef, useEffect, InputHTMLAttributes } from "react";
import { IconBaseProps } from "react-icons";

import { useField } from "@unform/core";

import { Container } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [registerField, fieldName]);

  return (
    <Container>
      <section>
        <Icon size={24} />
        <input
          type="text"
          ref={inputRef}
          {...rest}
          defaultValue={defaultValue}
        />
      </section>
      {error && <span>{error}</span>}
    </Container>
  );
};

export default Input;
