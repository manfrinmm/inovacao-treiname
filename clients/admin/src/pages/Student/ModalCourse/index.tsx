import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import api from "~/services/api";

import { Container, Course, Block } from "./styles";

interface ModalCourseProps {
  setModalVisible(value: boolean): void;
}

interface CourseProps {
  id: string;
  name: string;
}

const ModalCourse: React.FC<ModalCourseProps> = ({ setModalVisible }) => {
  const [courseSelected, setCourseSelected] = useState("");

  const [courses, setCourses] = useState<CourseProps[]>([]);
  const { user_id } = useParams();

  const handleReleaseCourse = useCallback(async () => {
    await api.post("/user-courses", {
      user_id,
      course_id: courseSelected,
    });

    setModalVisible(false);

    window.location.reload();
  }, [user_id, courseSelected, setModalVisible]);

  const handleCloseModal = useCallback(async () => {
    setModalVisible(false);
  }, [setModalVisible]);

  useEffect(() => {
    api.get<CourseProps[]>("/courses").then(response => {
      const coursesFormatted = response.data.map(course => ({
        id: course.id,
        name: course.name,
      }));

      setCourses(coursesFormatted);
    });
  }, []);

  return (
    <>
      <Block />

      <Container>
        <h1>Pesquise um curso para adicionar na lista de liberados</h1>
        <ul>
          {courses.map(course => (
            <Course key={course.id} isSelected={course.id === courseSelected}>
              <button
                type="button"
                onClick={() => {
                  console.log(course.id);

                  setCourseSelected(course.id);
                }}
              >
                {course.name}
              </button>
            </Course>
          ))}
        </ul>

        <footer>
          <button type="button" onClick={handleCloseModal}>
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleReleaseCourse}
            disabled={!courseSelected}
          >
            Liberar curso
          </button>
        </footer>
      </Container>
    </>
  );
};

export default ModalCourse;
