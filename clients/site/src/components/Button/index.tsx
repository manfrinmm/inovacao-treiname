import React from "react";

import { Container } from "./styles";

const Button: React.FC = ({ children, ...rest }) => (
  <Container {...rest}>{children}</Container>
);

export default Button;
