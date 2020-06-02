import React from "react";

import { Container, Link } from "./styles";

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Link to="students">Listagem de Alunos</Link>
      <Link to="courses">Listagem de Cursos</Link>
      <Link to="/course">Cadastrar Curso</Link>
      <Link to="examination">Cadastrar Prova</Link>
    </Container>
  );
};

export default Dashboard;
