import React, {
  useEffect,
  useRef,
  useMemo,
  InputHTMLAttributes,
  useCallback,
} from "react";

import { useField } from "@unform/core";

import { Container, Error } from "./styles";

interface InputCurrencyProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  name: string;
}

const InputCurrency: React.FC<InputCurrencyProps> = ({
  title,
  name,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { registerField, fieldName, error, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue(ref) {
        let value = String(ref.value);

        value = value.replace("R$", "");
        value = value.replace(".", "");
        value = value.replace(".", "");
        value = value.replace(".", "");
        value = value.replace(".", "");
        value = value.replace(",", ".");

        return Number(value);
      },
    });
  }, [registerField, fieldName]);

  const handleKeyUp = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      let { value } = event.currentTarget;

      value = value.replace(/\D/g, "");
      value = value.replace(/(\d)(\d{2})$/, "$1,$2");
      value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");

      if (!value.includes("R$ ")) {
        value = `R$ ${value}`;
      }

      event.currentTarget.value = value;
    },
    [],
  );

  const inputDefaultValue = useMemo(() => {
    const value = defaultValue;

    if (!defaultValue) {
      return undefined;
    }

    return Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }, [defaultValue]);

  return (
    <Container isErrored={!!error}>
      <label htmlFor={fieldName}>{title}</label>
      <input
        type="text"
        id={fieldName}
        ref={inputRef}
        defaultValue={inputDefaultValue}
        onKeyUp={handleKeyUp}
        {...rest}
      />

      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default InputCurrency;
