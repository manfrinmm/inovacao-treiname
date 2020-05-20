import React, { useEffect, useRef, RefObject } from "react";

import { useField, PathUnformField } from "@unform/core";

import { Container } from "./styles";

interface OptionProps {
  value: string;
  label: string;
}

interface Props {
  name: string;
  options: Array<OptionProps>;
}

const Radio: React.FC<Props> = ({ name, options }) => {
  const inputRefs = useRef([]);

  const { fieldName, registerField, defaultValue } = useField(name);

  // https://codesandbox.io/s/heuristic-haslett-58hhy?fontsize=14&hidenavigation=1&theme=dark&file=/src/components/Radio.js:765-789
  // useEffect(() => {
  //   registerField({
  //     name: fieldName,
  //     ref: inputRefs.current,
  //     path: undefined,
  //     getValue(refs) {
  //       const checked = refs.find(ref => ref.checked);

  //       return checked ? checked.value : null;
  //     },
  //     setValue(refs, value) {
  //       const item = refs.find(ref => ref.value === value);

  //       if (item) {
  //         item.checked = true;
  //       }
  //     },
  //   });
  // }, [registerField, fieldName]);

  return (
    <Container>
      {/* {options.map((option, index) => (
        <label key={option.value} htmlFor={option.value}>
          <input
            type="radio"
            name={fieldName}
            id={option.value}
            value={option.value}
            defaultChecked={defaultValue === option.value}
            ref={elementRef => {
              inputRefs.current[index] = elementRef;
            }}
          />
        </label>
      ))} */}
    </Container>
  );
};

export default Radio;
