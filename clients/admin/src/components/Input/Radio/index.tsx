import React, { useEffect, useRef, InputHTMLAttributes } from "react";

import { useField } from "@unform/core";

import { Container, Error } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  name: string;
}

const Radio: React.FC<InputProps> = ({ title, name, value, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { registerField, fieldName, error, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: `${fieldName}:${value}`,
      ref: inputRef.current,
      getValue(ref) {
        return ref.checked ? ref.value : null;
      },
      // setValue(ref: HTMLInputElement, valueInput: string) {
      //   if (ref.value === valueInput) {
      //     ref.checked = true;
      //   }
      // },
    });
  }, [registerField, fieldName, value]);

  return (
    <Container isErrored={!!error} isMarked={false}>
      <label>
        {title}
        <input
          type="radio"
          ref={inputRef}
          name={fieldName}
          value={value}
          defaultChecked={defaultValue === value}
          {...rest}
        />
      </label>

      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default Radio;
