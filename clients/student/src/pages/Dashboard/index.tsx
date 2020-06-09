import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "~/hooks/auth";
import api from "~/services/api";

import { Container, Course } from "./styles";

interface CourseResponseData {
  course: { id: string; thumbnail_url: string; name: string };
}

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
    const data: CourseData[] = [
      {
        thumbnail_url:
          "https://www.tagout.com.br/img/noticias/grande/b3ba995cf71dda366edff5d3a9861e47.png",
        name: "Curso Bloqueio e Etiquetagem de Fontes de Energias Perigosas",
        status: null,
        id: "121233",
      },
      {
        thumbnail_url:
          "https://www.tagout.com.br/img/noticias/grande/b3ba995cf71dda366edff5d3a9861e47.png",
        name: "Curso Bloqueio e Etiquetagem de Fontes de Energias Perigosas",
        status: null,
        id: "132aa123",
      },
      {
        thumbnail_url:
          "https://www.tagout.com.br/img/noticias/grande/b3ba995cf71dda366edff5d3a9861e47.png",
        name: "Curso Bloqueio e Etiquetagem de Fontes de Energias Perigosas",
        status: "Esperando confirmar pagamento",
        id: "121aa233",
      },
      {
        thumbnail_url:
          "https://www.tagout.com.br/img/noticias/grande/b3ba995cf71dda366edff5d3a9861e47.png",
        name: "Curso Bloqueio e Etiquetagem de Fontes de Energias Perigosas",
        status: "Expirado",
        id: "123213",
      },
      {
        thumbnail_url:
          "https://www.tagout.com.br/img/noticias/grande/b3ba995cf71dda366edff5d3a9861e47.png",
        name: "Curso Bloqueio e Etiquetagem de Fontes de Energias Perigosas",
        status: "Esperando confirmar pagamento",
        id: "12311",
      },
      {
        thumbnail_url:
          "https://www.tagout.com.br/img/noticias/grande/b3ba995cf71dda366edff5d3a9861e47.png",
        name: "Curso Bloqueio e Etiquetagem de Fontes de Energias Perigosas",
        status: "Expirado",
        id: "1232",
      },
    ];

    api.get(`/users/${user.id}`).then(response => {
      const coursesResponse = response.data.courses;

      setCourses(
        coursesResponse.map(({ course }: CourseResponseData) => course),
      );
    });

    // setCourses(data);
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
