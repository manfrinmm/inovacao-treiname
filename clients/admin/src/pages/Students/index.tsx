import React, { useState, useEffect, useCallback } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

import api from "~/services/api";

import { Container, StudentsContainer, StudentContent } from "./styles";

interface Student {
  id: string;
  name: string;
  cpf: string;
  phone: string;
}

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [studentsFiltered, setStudentsFiltered] = useState<Student[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    api.get("users").then(response => {
      setStudents(response.data);
      setStudentsFiltered(response.data);
    });
  }, []);

  const handleFilterInput = useCallback(event => {
    const filterValue = event.target.value;
    setFilter(filterValue);
  }, []);

  useEffect(() => {
    if (!filter) {
      setStudentsFiltered(students);
    } else {
      const courseFiltered = students.filter(student => {
        const studentName = student.name.toLocaleUpperCase();
        const studentCPF = student.cpf.toLocaleUpperCase();

        const foundCourse = studentName.includes(filter.toLocaleUpperCase());
        const foundCategory = studentCPF.includes(filter.toLocaleUpperCase());

        if (foundCourse || foundCategory) {
          return student;
        }
        return null;
      });
      setStudentsFiltered(courseFiltered);
    }
  }, [filter, students]);

  return (
    <Container>
      <header>
        <input
          type="search"
          placeholder="Pesquise por um Aluno ou CPF"
          value={filter}
          onChange={handleFilterInput}
        />
      </header>
      <StudentsContainer>
        {studentsFiltered.map(student => (
          <StudentContent key={student.id}>
            <div>
              <p>{student.name}</p>
              <span>
                {student.cpf} - 📞 {student.phone}
              </span>
            </div>
            <Link to={`student/${student.id}`}>
              <MdKeyboardArrowRight size={28} />
            </Link>
          </StudentContent>
        ))}
      </StudentsContainer>
    </Container>
  );
};

export default Students;
