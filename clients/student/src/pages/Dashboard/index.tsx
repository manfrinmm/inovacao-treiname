import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "~/hooks/auth";
import api from "~/services/api";

import { Container, Course } from "./styles";

interface CourseData {
  id: string;
  thumbnail_url: string;
  name: string;
  status: "Esperando confirmar pagamento" | "Expirado" | null;
}

const Dashboard: React.FC = () => {
  const [courses, setCourses] = useState<CourseData[]>([]);

  const history = useHistory();
  const { user } = useAuth();

  useEffect(() => {
    api.get<CourseData[]>("/users/dashboard").then(response => {
      setCourses(response.data);
    });
  }, [user]);

  return (
    <Container>
      <header>
        <h1>Cursos |</h1>
        <p>Aprimore seus estudos</p>
      </header>

      <section>
        {courses.map(course => (
          <Course
            key={course.id}
            status={course.status}
            disabled={!!course.status}
            onClick={() => {
              history.push(`/course/${course.id}`);
            }}
          >
            <div>
              <img src={course.thumbnail_url} alt={course.name} />
              <strong>{course.name}</strong>
            </div>
            {course.status && <strong>{course.status}</strong>}
          </Course>
        ))}
      </section>
    </Container>
  );
};

export default Dashboard;
