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
      name: fieldName,
      ref: inputRef.current,
      getValue(ref) {
        console.log("refName", ref.name);
        console.log("refCheck", ref.checked);
        console.log("refValue", ref.value);
        console.log("ref", ref);
        console.log(" ");

        return ref.value;
      },
      setValue(ref: HTMLInputElement, valueInput: string) {
        console.log("ref", ref);
        console.log("valueInput", valueInput);

        if (ref.value === valueInput) {
          ref.checked = true;
        }
      },
    });
  }, [registerField, fieldName]);

  return (
    <Container isErrored={!!error} isMarked={defaultValue === radioValue}>
      <label>
        {title}
        <input
          type="radio"
          ref={inputRef}
          name={fieldName}
          defaultValue={radioValue}
          defaultChecked={defaultValue === radioValue}
          {...rest}
        />
      </label>

      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default Radio;
