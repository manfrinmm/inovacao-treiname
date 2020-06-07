import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

// import { Form } from "@unform/web";

// import InputSearch from "~/components/InputSearch";
import api from "~/services/api";

import { Container, CourseList, CourseItem } from "./styles";

interface CourseProps {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  created_at_formatted: string;
  updated_at_formatted: string;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<CourseProps[]>([]);

  useEffect(() => {
    api.get<CourseProps[]>("/courses").then(response => {
      const coursesFormatted = response.data.map(course => ({
        ...course,
        created_at_formatted: new Date(course.created_at).toLocaleDateString(),
        updated_at_formatted: new Date(course.updated_at).toLocaleDateString(),
      }));

      setCourses(coursesFormatted);
    });
  }, []);

  return (
    <Container>
      {/* <Form
        onSubmit={data => {
          console.log(data);
        }}
      >
        <InputSearch name="course" placeholder="Pesquise por um curso" />
      </Form> */}
      <CourseList>
        {courses.map(course => (
          <CourseItem key={course.id}>
            <div>
              <p>{course.name}</p>
              <section>
                <span>Criado em: {course.created_at_formatted}</span>
                <span>Atualizado em: {course.updated_at_formatted}</span>
              </section>
            </div>
            <Link to={`/course/${course.id}`}>
              <MdKeyboardArrowRight size={48} />
            </Link>
          </CourseItem>
        ))}
      </CourseList>
    </Container>
  );
};

export default Courses;
