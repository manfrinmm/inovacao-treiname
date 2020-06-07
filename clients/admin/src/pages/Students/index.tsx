import React, { useState, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

import { Form } from "@unform/web";

import InputSearch from "~/components/InputSearch";
import api from "~/services/api";

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
    api.get("users").then(response => {
      setStudents(response.data);
    });
  }, []);

  return (
    <Container>
      <Form
        onSubmit={data => {
          console.log(data);
        }}
      >
        {/* <InputSearch
          name="student"
          options={options}
          placeholder="Pesquise por um Aluno"
          isClearable
        /> */}
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
