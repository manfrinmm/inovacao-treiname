import React, { useEffect, useState } from "react";
import { FaFileDownload, FaCertificate } from "react-icons/fa";
import { MdAccessTime, MdTimelapse } from "react-icons/md";

import Button from "~/components/Button";

import { Container, Info } from "./styles";

interface CourseProps {
  name: string;
  category: string;
  modality: string;
  description: string;
  target_audience: string;
  learns: string[];
  modules: [
    {
      name: string;
      description: string;
    },
  ];
  thumbnail: string;
  value: number;
  docs_download: number;
  course_expiration: number;
  workload: number;
  illustrative_video?: string;
}

const Course: React.FC = () => {
  const [course, setCourse] = useState({} as CourseProps);

  useEffect(() => {
    const data: CourseProps = {
      name: "Curso Bloqueio e Etiquetagem de Fontes de Energias Perigosas",
      category: "NR10",
      modality: "Formação",
      description:
        "Instruir, orientar e capacitar trabalhadores em geral, que lidam com formas de energias perigosas, de forma a garantir a segurança dos  funcionários, contratados e subcontratados, protegendo-os contra     energização inesperada, ligações ou fuga das energias residuais      durante a realização de serviços.",
      target_audience:
        "Trabalhadores em geral que executam serviços em com formas de energias perigosas e/ou que realizam serviços ou manutenção nos equipamentos energizados, tais como: instalação, construção,      inspeção, limpeza, lubrificação, reparos, montagem e ajustes.",
      learns: ["Ambiente de Trabalho", "Dados estáticos"],
      modules: [
        {
          name: "O ambiente de trabalho",
          description:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o           trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual,          que incluem óculos, protetores auriculares, máscaras, mangotes, capacetes, luvas, botas, cintos          de segurança, protetor solar e outros itens de proteção. Esses acessórios são indispensáveis em           fábricas e processos industriais em geral.",
        },
      ],
      thumbnail:
        "https://portal.ifba.edu.br/jequie/noticias/2019/agosto/curso-de-extensao-nr-10-lancado-edital-para-selecao/banner_site.png",
      value: 124532,
      docs_download: 12,
      course_expiration: 60,
      workload: 8,
      illustrative_video: "",
    };

    setCourse(data);
  }, []);

  return (
    <Container>
      <aside>
        <img src={course.thumbnail} alt={course.name} />
        <h1>
          {Intl.NumberFormat("pt-br", {
            style: "currency",
            currency: "BRL",
          }).format(course.value)}
        </h1>
        <Button>Comprar curso</Button>

        <span>Pagamento processado pela PagSeguro</span>
        <Info>
          <p>Este curso inclui</p>
          <div>
            <FaFileDownload size={24} />
            <p>{`${course.docs_download} materiais para download`}</p>
          </div>
          <div>
            <MdAccessTime size={24} />
            <p>{`Acesso por ${course.course_expiration} dias`}</p>
          </div>
          <div>
            <FaCertificate size={24} color="#F99000" />
            <p>Certificado de conclusão</p>
          </div>
          <div>
            <MdTimelapse size={24} />
            <p>{`${course.workload} horas de Carga Horária`}</p>
          </div>
        </Info>
      </aside>
      <article>
        <h1>{course.name}</h1>
        <section>
          <p>Categoria: {course.category}</p>
          <p>Modalidade: {course.modality}</p>
        </section>
        <p>{course.description}</p>
        <h2>Para quem este curso é direcionado</h2>
        <p>{course.target_audience}</p>
        <section>
          {course.learns?.map(learn => (
            <p>{learn}</p>
          ))}
        </section>
        <h2>Conteúdo do curso</h2>
        <section>
          {course.modules?.map(module => (
            <div>
              <p>{module.name}</p>
              <p>{module.description}</p>
            </div>
          ))}
        </section>
      </article>
    </Container>
  );
};

export default Course;
