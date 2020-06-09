import React, { useEffect, useRef, InputHTMLAttributes } from "react";

import { useField } from "@unform/core";

import { Container } from "./styles";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  // value: string;
}

const Radio: React.FC<Props> = ({ name, label, value, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, registerField, defaultValue } = useField(name);
  // console.log("defaultValue", defaultValue);
  // console.log("value", value);

  // https://codesandbox.io/s/heuristic-haslett-58hhy?fontsize=14&hidenavigation=1&theme=dark&file=/src/components/Radio.js:765-789
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue(ref) {
        console.log("refName", ref.name);
        console.log("refCheck", ref.checked);
        console.log("refValue", ref.value);

        return ref.checked ? ref.value : null;
      },
      setValue(ref, valueInput) {
        console.log("valueInput", valueInput);

        if (ref.value === valueInput) {
          ref.checked = true;
        }
      },
    });
  }, [registerField, fieldName]);

  return (
    <Container>
      <label>
        {label}
        <input
          type="radio"
          ref={inputRef}
          name={fieldName}
          value={value}
          // onChange={event => {
          //   console.log("aa");
          //   if (inputRef.current) inputRef.current.value = event.target.value;
          // }}
          defaultChecked={defaultValue === value}
          {...rest}
        />
      </label>
    </Container>
  );
};

export default Radio;
