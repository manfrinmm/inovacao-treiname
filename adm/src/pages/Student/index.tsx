import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdLink } from "react-icons/md";
import { useHistory, useParams } from "react-router-dom";

import Button from "~/components/Button";
import CourseItem from "~/components/CourseItem";
import Input from "~/components/Input";

import { Container, StudentInfo, Courses } from "./styles";

const Student: React.FC = () => {
  const { user_id } = useParams();
  const { goBack } = useHistory();
  const [hasLink, setHashLink] = useState(true);

  return (
    <Container>
      <header>
        <button
          type="button"
          onClick={() => {
            goBack();
          }}
        >
          <MdKeyboardArrowLeft />
          voltar para listagem de alunos
        </button>
      </header>
      {user_id}
      <section>
        <StudentInfo hasLink={hasLink}>
          <h1>Aluno</h1>
          <section>
            <p>
              Nome:
              <strong>Matheus Menezes Manfrin</strong>
            </p>
            <p>
              CPF: <strong>009.543.681-26</strong>
            </p>
            <p>
              RG: <strong>5717301</strong>
            </p>
            <p>
              Telefone: <strong>(64) 9-9614-0384</strong>
            </p>
          </section>

          <Input
            name="link"
            title="Adicione um link do vídeo da prova prática"
            placeholder="Link do vídeo"
          />
          <Button
            icon={MdLink}
            disabled={!hasLink}
            onClick={() => {
              console.log("click");
            }}
          >
            Visualizar vídeo
          </Button>
        </StudentInfo>
        <Courses>
          <section>
            <header>
              <p>
                Cursos liberados para <strong>Matheus</strong>
              </p>
              <Button
                icon={FaPlus}
                onClick={() => {
                  console.log("click");
                }}
              >
                Liberar curso
              </Button>
            </header>
            <CourseItem />
            <CourseItem />
            <CourseItem />
          </section>
          <footer>
            <Button>Anterior</Button>
            <h1>1/3</h1>
            <Button>Próxima</Button>
          </footer>
        </Courses>
      </section>
      <Button>Atualizar Perfil</Button>
    </Container>
  );
};

export default Student;
