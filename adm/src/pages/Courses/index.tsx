import React, { useEffect, useState } from "react";

import { Form } from "@unform/web";
import CourseItem from "~/components/CourseItem";
import InputSearch from "~/components/InputSearch";

import { Container } from "./styles";

interface CourseProps {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<CourseProps[]>([]);

  useEffect(() => {
    const data = [
      {
        id: 123,
        name:
          "Curso Online de CIPA (Comissão Interna de Prevenção de Acidentes)",
        created_at: new Date(2020, 4, 13).toLocaleDateString(),
        updated_at: new Date(2020, 4, 24).toLocaleDateString(),
      },
      {
        id: 13,
        name:
          "Curso Online de CIPA3 (Comissão Interna de Prevenção de Acidentes)",
        created_at: new Date(2020, 4, 13).toLocaleDateString(),
        updated_at: new Date(2020, 4, 24).toLocaleDateString(),
      },
      {
        id: 3,
        name: "Curso Online de CIPA2 (Comissãs)",
        created_at: new Date(2020, 4, 13).toLocaleDateString(),
        updated_at: new Date(2020, 4, 24).toLocaleDateString(),
      },
    ];

    setCourses(data);
  }, []);

  return (
    <Container>
      <Form
        onSubmit={data => {
          console.log(data);
        }}
      >
        <InputSearch name="course" placeholder="Pesquise por um curso" />
      </Form>
      {courses.map(course => (
        <CourseItem data={course} />
      ))}
    </Container>
  );
};

export default Courses;
