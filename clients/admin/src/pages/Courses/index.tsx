import React, { useEffect, useState, useCallback } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

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
  const [coursesFiltered, setCoursesFiltered] = useState<CourseProps[]>([]);
  const [filter, setFilter] = useState("");

  const handleFilterInput = useCallback(event => {
    const filterValue = event.target.value;
    setFilter(filterValue);
  }, []);

  useEffect(() => {
    api.get<CourseProps[]>("/courses").then(response => {
      const coursesFormatted = response.data.map(course => ({
        ...course,
        created_at_formatted: new Date(course.created_at).toLocaleDateString(),
        updated_at_formatted: new Date(course.updated_at).toLocaleDateString(),
      }));

      setCourses(coursesFormatted);
      setCoursesFiltered(coursesFormatted);
    });
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
  }, [filter, courses]);

  return (
    <Container>
      <header>
        <input
          type="search"
          placeholder="Pesquise por um curso"
          value={filter}
          onChange={handleFilterInput}
        />
      </header>
      <CourseList>
        {coursesFiltered.map(course => (
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
