import React, { useEffect, useState } from "react";
import { FaFileDownload, FaCertificate } from "react-icons/fa";
import { MdAccessTime, MdTimelapse, MdCheck } from "react-icons/md";
import { useParams } from "react-router-dom";

import Button from "~/components/Button";
import api from "~/services/api";

import ModuleItem from "./ModuleItem";
import { Container, Info, WillLearn, LearnItem, Modules } from "./styles";

interface CourseProps {
  name: string;
  category: string;
  modality: string;
  description: string;
  target_audience: string;
  learns: string[];
  modules: Array<{
    name: string;
    description: string;
  }>;
  thumbnail_url: string;
  value: number;
  docs_download: number;
  course_expiration: number;
  workload: number;
  illustrative_video?: string;
}

const Course: React.FC = () => {
  const [course, setCourse] = useState({} as CourseProps);
  const { course_id } = useParams();

  useEffect(() => {
    api.get(`/courses/${course_id}`).then(response => {
      setCourse(response.data);
    });
  }, [course_id]);

  return (
    <Container>
      <aside>
        <img src={course.thumbnail_url} alt={course.name} />
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
            <p>{`${course.modules?.length} materiais para download`}</p>
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
          <p>
            Categoria: <strong>{course.category}</strong>
          </p>
          <p>
            Modalidade:<strong> {course.modality}</strong>
          </p>
        </section>
        <p className="description">{course.description}</p>
        <h2>Para quem este curso é direcionado</h2>
        <p className="description">{course.target_audience}</p>
        <WillLearn>
          <h3>O que você aprenderá</h3>
          <div>
            {course.learns?.map(learn => (
              <LearnItem key={Math.random()}>
                <p>
                  <MdCheck /> {learn}
                </p>
              </LearnItem>
            ))}
          </div>
        </WillLearn>
        <h2>Conteúdo do curso</h2>
        <Modules>
          {course.modules?.map(module => (
            <ModuleItem data={module} key={Math.random()} />
          ))}
        </Modules>
      </article>
    </Container>
  );
};

export default Course;
