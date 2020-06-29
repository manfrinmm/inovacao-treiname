import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

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
  const [coursesFiltered, setCoursesFiltered] = useState<CourseProps[]>(
    courses,
  );
  const [filter, setFilter] = useState("");

  const { user_id } = useParams();

  const handleReleaseCourse = useCallback(async () => {
    try {
      await api.post("/user-courses", {
        user_id,
        course_id: courseSelected,
      });

      toast.success("Curso liberado com sucesso.");
      setModalVisible(false);
    } catch (error) {
      toast.error(
        "Erro ao liberar curso para o usuário. Por favor, tente novamente.",
      );
    }
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

  const handleFilterInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const filterValue = event.target.value;

      setFilter(filterValue);
    },
    [],
  );

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

        return null;
      });

      setCoursesFiltered(courseFiltered);
    }
  }, [filter, courses]);

  return (
    <>
      <Block />

      <Container>
        <h1>Pesquise um curso para adicionar na lista de liberados</h1>
        <input
          type="search"
          placeholder="Pesquise por um curso"
          value={filter}
          onChange={handleFilterInput}
        />
        <ul>
          {coursesFiltered.map(course => (
            <Course key={course.id} isSelected={course.id === courseSelected}>
              <button
                type="button"
                onClick={() => {
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
