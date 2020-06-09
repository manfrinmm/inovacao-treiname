import React, { useEffect, useState, useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import {
  MdKeyboardArrowLeft,
  MdLink,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { useHistory, useParams, Link } from "react-router-dom";

import { Form } from "@unform/web";
// eslint-disable-next-line import/no-duplicates
import { format, parseISO } from "date-fns";
// eslint-disable-next-line import/no-duplicates
import ptBr from "date-fns/locale/pt-BR";

import Button from "~/components/Button";
import LinkInput from "~/components/Input";
import api from "~/services/api";

import Input from "./Input";
import ModalCourse from "./ModalCourse";
import {
  Container,
  StudentInfo,
  Courses,
  CourseList,
  Course,
  Logs,
} from "./styles";

interface CourseResponseProps {
  course: {
    id: string;
    name: string;
  };
  expires_in: string;
  created_at: string;
}

interface LogResponseProps {
  id: string;
  ip: string;
  local: string;
  created_at: string;
}

interface LogProps {
  id: string;
  ip: string;
  local: string;
  created_at_formatted: Date;
}

interface CourseProps {
  id: string;
  name: string;
  expires_in_formatted: Date;
  created_at_formatted: Date;
}

interface UserDataProps {
  id: string;
  name: string;
  first_name: string;
  cpf: string;
  rg: string;
  phone: string;
  password?: string;
  exam_practice_link?: string;
  courses: CourseProps[];
  logs: LogProps[];
}

const Student: React.FC = () => {
  const [userData, setUserData] = useState({} as UserDataProps);
  const [modalVisible, setModalVisible] = useState(false);

  const { user_id } = useParams();

  const { goBack } = useHistory();

  useEffect(() => {
    api.get(`/users/${user_id}`).then(response => {
      const responseFormatted = {
        ...response.data,
        first_name: response.data.name.split(" ")[0],

        courses: response.data.courses.map((course: CourseResponseProps) => ({
          id: course.course.id,
          name: course.course.name,
          created_at_formatted: new Date(
            course.created_at,
          ).toLocaleDateString(),
          expires_in_formatted: new Date(
            course.expires_in,
          ).toLocaleDateString(),
        })),

        logs: response.data.logs.map((log: LogResponseProps) => {
          /* <td>domingo, 19 de abril de 2020 às 17:36</td> */

          return {
            ...log,
            created_at_formatted: format(
              parseISO(log.created_at),
              "eeee',' dd 'de' MMMM 'de' yyyy 'às' HH:mm",
              {
                locale: ptBr,
              },
            ),
          };
        }),
      } as UserDataProps;

      setUserData(responseFormatted);
    });
  }, [user_id]);

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleOpenModal = useCallback(async () => {
    setModalVisible(true);
  }, [setModalVisible]);

  const handleSubmit = useCallback(
    (data: Omit<UserDataProps, "courses">) => {
      const {
        id,
        name,
        first_name,
        cpf,
        rg,
        phone,
        password,
        exam_practice_link,
      } = data;

      const userNewData = {
        id,
        name,
        first_name,
        cpf,
        rg,
        ...(password ? { password } : {}),
        phone,
        exam_practice_link,
      };

      api.put(`/users/${user_id}`, userNewData).then(() => {
        window.location.reload();
      });
    },
    [user_id],
  );

  return (
    <Container>
      <header>
        <button type="button" onClick={handleGoBack}>
          <MdKeyboardArrowLeft />
          voltar para listagem de alunos
        </button>
      </header>
      <section>
        <StudentInfo hasLink={!!userData.exam_practice_link}>
          <h1>Aluno</h1>
          <Form id="formData" onSubmit={handleSubmit} initialData={userData}>
            <section>
              <Input name="name" title="Nome:" placeholder="Nome do aluno" />
              <Input name="cpf" title="CPF:" placeholder="CPF do aluno" />
              <Input name="rg" title="RG:" placeholder="RG do aluno" />
              <Input
                name="phone"
                title="Telefone:"
                placeholder="Telefone do aluno"
              />
              <Input
                name="password"
                title="Senha:"
                placeholder="Digite uma nova senha para o aluno, se necessário"
              />
            </section>

            <LinkInput
              name="exam_practice_link"
              title="Adicione um link do vídeo da prova prática"
              placeholder="Link do vídeo"
            />
            <Button
              icon={MdLink}
              disabled={!userData.exam_practice_link}
              onClick={() => {
                const link = userData.exam_practice_link;

                if (link) {
                  window.open(link, "_blank");
                }
              }}
            >
              Visualizar vídeo
            </Button>
          </Form>
        </StudentInfo>
        <Courses>
          <section>
            <header>
              <p>
                Cursos liberados para
                <strong> {userData.first_name}</strong>
              </p>
              <Button icon={FaPlus} onClick={handleOpenModal}>
                Liberar curso
              </Button>
            </header>
            <CourseList>
              {userData.courses?.map(course => (
                <Course key={`${course.id}-${Math.random()}`}>
                  <div>
                    <p>{course.name}</p>
                    <section>
                      <span>Liberado em: {course.created_at_formatted}</span>
                      <span>Expira em: {course.expires_in_formatted}</span>
                    </section>
                  </div>
                  <Link to={`/course/${course.id}`} target="_blank">
                    <MdKeyboardArrowRight size={48} />
                  </Link>
                </Course>
              ))}
            </CourseList>
          </section>
          {/* <footer>
            <Button>Anterior</Button>
            <h1>1/3</h1>
            <Button>Próxima</Button>
          </footer> */}
        </Courses>
      </section>
      <Button type="submit" form="formData">
        Atualizar Perfil
      </Button>

      <Logs>
        <h2>Histórico de login</h2>

        <section>
          <table>
            <thead>
              <tr>
                <td>Login</td>
                <td>IP</td>
                <td>Local</td>
              </tr>
            </thead>
            <tbody>
              {userData.logs?.map(log => (
                <tr key={log.id}>
                  <td>{log.created_at_formatted}</td>
                  <td>{log.ip}</td>
                  <td>{log.local}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </Logs>

      {modalVisible && <ModalCourse setModalVisible={setModalVisible} />}
    </Container>
  );
};

export default Student;
