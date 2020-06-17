import React from "react";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaTable } from "react-icons/fa";
import { GoBook } from "react-icons/go";
import { MdCollectionsBookmark, MdLibraryBooks } from "react-icons/md";

import { Container, ContentItem } from "./styles";

const Dashboard: React.FC = () => {
  return (
    <Container>
      <section>
        <h2>Alunos</h2>
        <hr />
        <div>
          <ContentItem to="/students">
            <BsFillPersonLinesFill size={48} />
            <p>Listagem de Alunos</p>
          </ContentItem>
        </div>
      </section>
      <section>
        <h2>Cursos</h2>
        <hr />

        <div>
          <ContentItem to="/courses">
            <MdLibraryBooks size={48} />
            <p>Listagem de Cursos</p>
          </ContentItem>
          <ContentItem to="/course">
            <MdCollectionsBookmark size={48} />
            <p>Cadastrar Curso</p>
          </ContentItem>
        </div>
      </section>
      <section>
        <h2>Provas</h2>
        <hr />

        <ContentItem to="/examination">
          <GoBook size={48} />
          <p>Cadastrar Prova</p>
        </ContentItem>
      </section>
      <section>
        <h2>Relatórios</h2>
        <hr />

        <ContentItem to="/report-courses">
          <FaTable size={48} />
          <p>Relatório de cursos</p>
        </ContentItem>
      </section>
    </Container>
  );
};

export default Dashboard;
