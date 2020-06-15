import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import api from "~/services/api";

import { Container, CourseListContainer, CourseContainer } from "./styles";

interface CourseProps {
  id: string;
  thumbnail_url: string;
  name: string;
  modality: string;
  category: string;
}

const Home: React.FC = () => {
  const [courses, setCourses] = useState<CourseProps[]>([]);
  const [coursesFiltered, setCoursesFiltered] = useState<CourseProps[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    api.get("/courses").then(response => {
      setCourses(response.data);
      setCoursesFiltered(response.data);
    });
    // const data = [
    //   {
    //     id: String(Math.random()),
    //     name: "Curso Proteção Respiratória e Auditiva",
    //     category: "N11",
    //     modality: "Formação",
    //     thumbnail_url:
    //       "https://sistemaeso.com.br/Content/blog/seguranca-no-trabalho/o-que-e-um-epi-equipamento-de-protecao-individual.jpg",
    //   },
    //   {
    //     id: String(Math.random()),
    //     name: "Curso Proteção  e Auditiva",
    //     category: "API",
    //     modality: "Formação",
    //     thumbnail_url:
    //       "https://sistemaeso.com.br/Content/blog/seguranca-no-trabalho/o-que-e-um-epi-equipamento-de-protecao-individual.jpg",
    //   },
    //   {
    //     id: String(Math.random()),
    //     name: "Curso Proteção Respiratória e ",
    //     category: "API",
    //     modality: "Formação",
    //     thumbnail_url:
    //       "https://sistemaeso.com.br/Content/blog/seguranca-no-trabalho/o-que-e-um-epi-equipamento-de-protecao-individual.jpg",
    //   },
    //   {
    //     id: String(Math.random()),
    //     name: " Proteção Respiratória e Auditiva",
    //     category: "N10",
    //     modality: "Formação",
    //     thumbnail_url:
    //       "https://sistemaeso.com.br/Content/blog/seguranca-no-trabalho/o-que-e-um-epi-equipamento-de-protecao-individual.jpg",
    //   },
    //   {
    //     id: String(Math.random()),
    //     name: "Curso Proteção Respiratória e Auditiva",
    //     category: "N10",
    //     modality: "Formação",
    //     thumbnail_url:
    //       "https://sistemaeso.com.br/Content/blog/seguranca-no-trabalho/o-que-e-um-epi-equipamento-de-protecao-individual.jpg",
    //   },
    //   {
    //     id: String(Math.random()),
    //     name: "Curso Proteção Respiratória e aaaaaa",
    //     category: "N10",
    //     modality: "Formação",
    //     thumbnail_url:
    //       "https://sistemaeso.com.br/Content/blog/seguranca-no-trabalho/o-que-e-um-epi-equipamento-de-protecao-individual.jpg",
    //   },
    //   {
    //     id: String(Math.random()),
    //     name: "Curso masoque Respiratória e Auditiva",
    //     category: "N10",
    //     modality: "Formação",
    //     thumbnail_url:
    //       "https://sistemaeso.com.br/Content/blog/seguranca-no-trabalho/o-que-e-um-epi-equipamento-de-protecao-individual.jpg",
    //   },
    //   {
    //     id: String(Math.random()),
    //     name: "Curso Proteção Respiratória e Auditiva",
    //     category: "N10",
    //     modality: "Formação",
    //     thumbnail_url:
    //       "https://sistemaeso.com.br/Content/blog/seguranca-no-trabalho/o-que-e-um-epi-equipamento-de-protecao-individual.jpg",
    //   },
    //   {
    //     id: String(Math.random()),
    //     name: "Curso Proteção Respiratória e Auditiva",
    //     category: "N10",
    //     modality: "Formação",
    //     thumbnail_url:
    //       "https://sistemaeso.com.br/Content/blog/seguranca-no-trabalho/o-que-e-um-epi-equipamento-de-protecao-individual.jpg",
    //   },
    //   {
    //     id: String(Math.random()),
    //     name: "Curso Proteção Respiratória e Auditiva",
    //     category: "N321",
    //     modality: "Formação",
    //     thumbnail_url:
    //       "https://sistemaeso.com.br/Content/blog/seguranca-no-trabalho/o-que-e-um-epi-equipamento-de-protecao-individual.jpg",
    //   },
    //   {
    //     id: String(Math.random()),
    //     name: "Curso Proteção Respiratória e Auditiva",
    //     category: "N123",
    //     modality: "Formação",
    //     thumbnail_url:
    //       "https://sistemaeso.com.br/Content/blog/seguranca-no-trabalho/o-que-e-um-epi-equipamento-de-protecao-individual.jpg",
    //   },
    // ] as CourseProps[];

    // setCourses(data);
    // setCoursesFiltered(data);
  }, []);

  const handleFilterInput = useCallback(event => {
    const filterValue = event.target.value;
    setFilter(filterValue);
  }, []);

  useEffect(() => {
    if (!filter) {
      setCoursesFiltered(courses);
    } else {
      const courseFiltered = courses.filter(course => {
        const courseName = course.name.toLocaleUpperCase();
        const categoryName = course.category.toLocaleUpperCase();

        const foundCourse = courseName.includes(filter.toLocaleUpperCase());
        const foundCategory = categoryName.includes(filter.toLocaleUpperCase());

        if (foundCourse || foundCategory) {
          return course;
        }
      });
      setCoursesFiltered(courseFiltered);
    }
  }, [filter, courses]);

  return (
    <Container>
      <header>
        <h1>Cursos Online</h1>
        <input
          type="search"
          placeholder="Pesquise por um curso ou categória"
          value={filter}
          onChange={handleFilterInput}
        />
      </header>
      <CourseListContainer>
        <div>
          {coursesFiltered.map(course => (
            <CourseContainer key={course.id}>
              <img src={course.thumbnail_url} alt={course.name} />
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
        </div>
      </CourseListContainer>
    </Container>
  );
};

export default Home;
