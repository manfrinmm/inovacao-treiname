import React, { useEffect, useRef, InputHTMLAttributes } from "react";

import { useField } from "@unform/core";

import { Container, Error } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  name: string;
  radioValue: string;
}

const Radio: React.FC<InputProps> = ({ title, name, radioValue, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { registerField, fieldName, error, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: `${fieldName}:${radioValue}`,
      ref: inputRef.current,
      // path: "value",
      getValue(ref) {
        return ref.checked ? ref.value : null;
      },
      // setValue(ref: HTMLInputElement, valueInput: string) {
      //   if (ref.value === valueInput) {
      //     ref.checked = true;
      //   }
      // },
    });
  }, [registerField, fieldName, radioValue]);

  return (
    <Container isErrored={!!error} isMarked={false}>
      <label>
        {title}
        <input
          type="radio"
          ref={inputRef}
          name={fieldName}
          value={radioValue}
          defaultChecked={defaultValue === radioValue}
          {...rest}
        />
      </label>

      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default Radio;
