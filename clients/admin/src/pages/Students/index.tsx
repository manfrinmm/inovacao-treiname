import React, { useState, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

import { Form } from "@unform/web";
import InputSearch from "~/components/InputSearch";

import { Container, StudentsContainer, StudentContent } from "./styles";

interface Student {
  id: string;
  name: string;
  cpf: string;
}

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  const options = [
    { value: "Todos", label: "Todos" },
    { value: "matheus", label: "matheus" },
    { value: "matheus1", label: "matheus1" },
    { value: "matheus2", label: "matheus2" },
  ];

  useEffect(() => {
    const data = [
      { id: "123", name: "Matheus", cpf: "00955045445" },
      { id: "1233", name: "Jeslaine", cpf: "00845865216" },
      { id: "1234", name: "Mario", cpf: "12365425816" },
      { id: "1235", name: "Jordana", cpf: "99944455511" },
    ];

    setStudents(data);
  }, []);

  return (
    <Container>
      <Form
        onSubmit={data => {
          console.log(data);
        }}
      >
        <InputSearch
          name="student"
          options={options}
          placeholder="Pesquise por um Aluno"
          isClearable
        />
      </Form>
      <StudentsContainer>
        {students.map(student => (
          <StudentContent key={student.id}>
            <div>
              <p>{student.name}</p>
              <span>{student.cpf}</span>
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
