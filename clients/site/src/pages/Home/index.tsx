import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Container, CourseContainer } from "./styles";

interface CourseProps {
  id: string;
  thumbnail: string;
  name: string;
  modality: string;
  category: string;
}

const Home: React.FC = () => {
  const [courses, setCourses] = useState<CourseProps[]>([]);

  useEffect(() => {
    const data: CourseProps[] = [
      {
        id: "123",
        thumbnail:
          "https://portal.ifba.edu.br/jequie/noticias/2019/agosto/curso-de-extensao-nr-10-lancado-edital-para-selecao/banner_site.png",
        name:
          "Etiquetagem de Fontes dee Fon dee Fon dee Fon dee Fon dee Fontes dee Fontes dee Fontes dee Fontes de Energias Perigosas",
        modality: "Formação",
        category: "NR10",
      },
      {
        id: "1232",
        thumbnail:
          "https://portal.ifba.edu.br/jequie/noticias/2019/agosto/curso-de-extensao-nr-10-lancado-edital-para-selecao/banner_site.png",
        name: "Etiquetagem de Fontes de Energias Perigosas",
        modality: "Formação",
        category: "NR10",
      },
      {
        id: "12223",
        thumbnail:
          "https://portal.ifba.edu.br/jequie/noticias/2019/agosto/curso-de-extensao-nr-10-lancado-edital-para-selecao/banner_site.png",
        name: "Etiquetagem de Fontes de Energias Perigosas",
        modality: "Formação",
        category: "NR10",
      },
      {
        id: "11123",
        thumbnail:
          "https://portal.ifba.edu.br/jequie/noticias/2019/agosto/curso-de-extensao-nr-10-lancado-edital-para-selecao/banner_site.png",
        name: "Etiquetagem de Fontes de Energias Perigosas",
        modality: "Formação",
        category: "NR10",
      },
      {
        id: "12323",
        thumbnail:
          "https://portal.ifba.edu.br/jequie/noticias/2019/agosto/curso-de-extensao-nr-10-lancado-edital-para-selecao/banner_site.png",
        name: "Etiquetagem de Fontes de Energias Perigosas",
        modality: "Formação",
        category: "NR10",
      },
      {
        id: "112323",
        thumbnail:
          "https://portal.ifba.edu.br/jequie/noticias/2019/agosto/curso-de-extensao-nr-10-lancado-edital-para-selecao/banner_site.png",
        name: "Etiquetagem de Fontes de Energias Perigosas",
        modality: "Formação",
        category: "NR10",
      },
      {
        id: "132123",
        thumbnail:
          "https://portal.ifba.edu.br/jequie/noticias/2019/agosto/curso-de-extensao-nr-10-lancado-edital-para-selecao/banner_site.png",
        name: "Etiquetagem de Fontes de Energias Perigosas",
        modality: "Formação",
        category: "NR10",
      },
      {
        id: "121233",
        thumbnail:
          "https://portal.ifba.edu.br/jequie/noticias/2019/agosto/curso-de-extensao-nr-10-lancado-edital-para-selecao/banner_site.png",
        name: "Etiquetagem de Fontes de Energias Perigosas",
        modality: "Formação",
        category: "NR10",
      },
      {
        id: "1231233",
        thumbnail:
          "https://portal.ifba.edu.br/jequie/noticias/2019/agosto/curso-de-extensao-nr-10-lancado-edital-para-selecao/banner_site.png",
        name: "Etiquetagem de Fontes de Energias Perigosas",
        modality: "Formação",
        category: "NR10",
      },
    ];

    setCourses(data);
  }, []);

  return (
    <Container>
      <header>
        <h1>Cursos Online</h1>
        <input type="search" placeholder="Pesquise por um curso" />
      </header>
      <section>
        {courses.map(course => (
          <CourseContainer key={course.id}>
            <img src={course.thumbnail} alt={course.name} />
            <p>{course.name}</p>
            <span>
              Modalidade: <strong>{course.modality}</strong>
            </span>
            <span>
              Categoria: <strong>{course.category}</strong>
            </span>
            <Link to={`course/${course.id}`}>Ver detalhes</Link>
          </CourseContainer>
        ))}
      </section>
    </Container>
  );
};

export default Home;
