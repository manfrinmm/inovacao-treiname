import React, { SelectHTMLAttributes } from "react";

import { Container } from "./styles";

interface OptionsProps {
  label: string;
  value: string;
}

interface InputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  title: string;
  name: string;
  options: OptionsProps[];
}

const Select: React.FC<InputProps> = ({ title, name, options, ...rest }) => {
  return (
    <Container>
      <label htmlFor={name}>{title}</label>
      <select id={name} {...rest}>
        <option value="">Selecione um curso</option>

        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default Select;
