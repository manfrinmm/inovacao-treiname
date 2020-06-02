import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import { Container, CourseContainer } from "./styles";
import api from "~/services/api";
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

        const foundCourse = courseName.includes(filter.toLocaleUpperCase());

        if (foundCourse) {
          return course;
        }
      });
      setCoursesFiltered(courseFiltered);
    }
  }, [filter]);

  return (
    <Container>
      <header>
        <h1>Cursos Online</h1>
        <input
          type="search"
          placeholder="Pesquise por um curso"
          value={filter}
          onChange={handleFilterInput}
        />
      </header>
      <section>
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
      </section>
    </Container>
  );
};

export default Home;
