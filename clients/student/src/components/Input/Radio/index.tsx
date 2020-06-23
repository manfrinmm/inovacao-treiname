import React, { useEffect, useRef, InputHTMLAttributes } from "react";

import { useField } from "@unform/core";

import { Container } from "./styles";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Radio: React.FC<Props> = ({ name, label, value, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, registerField, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: `${fieldName}:${value}`,
      ref: inputRef.current,
      getValue(ref) {
        return ref.checked ? ref.value : null;
      },
      setValue(ref, valueInput) {
        if (ref.value === valueInput) {
          ref.checked = true;
        }
      },
    });
  }, [registerField, fieldName, value]);

  return (
    <Container>
      <label>
        {label}
        <input
          type="radio"
          ref={inputRef}
          name={fieldName}
          value={value}
          defaultChecked={defaultValue === value}
          {...rest}
        />
      </label>
    </Container>
  );
};

export default Radio;
