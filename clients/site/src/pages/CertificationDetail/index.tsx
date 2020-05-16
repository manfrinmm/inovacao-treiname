import React, { useState, useEffect } from "react";
import { MdKeyboardArrowLeft, MdFileDownload } from "react-icons/md";
import { Link } from "react-router-dom";

import { Container, Content } from "./styles";

interface Certification {
  name: string;
  certification: string;
}

// 8:27 ver https://www.youtube.com/watch?v=89K5D6VX2X4

const CertificationDetail: React.FC = () => {
  const [student, setStudent] = useState({} as Certification);

  useEffect(() => {
    const data = {
      name: "Matheus Menezes Manfrin",
      certification:
        "https://expoforest.com.br/wp-content/uploads/2017/05/exemplo.pdf",
    };

    setStudent(data);
  }, []);

  return (
    <Container>
      <header>
        <Link to="/certification">
          <MdKeyboardArrowLeft size={24} color="#000" /> Pesquisar outro
          certificado
        </Link>
      </header>
      <Content>
        <section>
          <p>Este certificado é válido para</p>
          <strong>{student.name}</strong>
        </section>
        <div>
          <a
            href={student.certification}
            download={`certificado-${student.name}`}
          >
            <MdFileDownload size={24} />
            Baixar certificado
          </a>
        </div>
        <iframe title="pdf" src={student.certification} />
      </Content>
    </Container>
  );
};

export default CertificationDetail;
