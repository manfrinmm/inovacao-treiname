import React, { useState, useEffect } from "react";
import { MdKeyboardArrowLeft, MdFileDownload } from "react-icons/md";
import { Link, useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import api from "~/services/api";

import { Container, Content } from "./styles";

interface Certification {
  name: string;
  certification_url: string;
}

const CertificationDetail: React.FC = () => {
  const [certification, setCertification] = useState<Certification>();

  const { certification_id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadCertificationData(): Promise<void> {
      try {
        const response = await api.get(`/certification/${certification_id}`);

        setCertification(response.data);
      } catch (error) {
        toast.error(
          "Erro ao carregar informações de certificado.\nPor favor, verifique o código do certificado.",
        );
        history.push("/certification");
      }
    }

    loadCertificationData();
  }, [history, certification_id]);

  if (!certification) {
    return null;
  }

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
          <strong>{certification.name}</strong>
        </section>
        <div>
          <a
            href={certification.certification_url}
            download={`certificado-${certification.name}`}
            target="__blank"
          >
            <MdFileDownload size={24} />
            Baixar certificado
          </a>
        </div>
        <iframe title="pdf" src={certification.certification_url} />
      </Content>
    </Container>
  );
};

export default CertificationDetail;
