import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

import { Container } from "./styles";

const CourseItem: React.FC = () => {
  return (
    <Container>
      <div>
        <p>Curso Online de CIPA (Comissão Interna de Prevenção de Acidentes)</p>
        <section>
          <span>Liberado em: 20/03/2020</span>
          <span>Expira em: 20/08/2020</span>
        </section>
      </div>
      <Link to="/course">
        <MdKeyboardArrowRight size={48} />
      </Link>
    </Container>
  );
};

export default CourseItem;
