import React, { useState, useEffect, useCallback } from "react";
import { FaTools } from "react-icons/fa";
import { MdLink, MdFileDownload, MdCheck } from "react-icons/md";
import { useHistory } from "react-router-dom";

import Button from "~/components/Button";

import ModuleItem from "./ModuleItem";
import { Container, Header, ExameDetail } from "./styles";

interface ModuleData {
  id: string;
  name: string;
  video_link: string | null;
  extra_link: string | null;
  file_link: string;
}

interface CourseData {
  name: string;
  thumbnail: string;
  modules: ModuleData[];
  released_on: Date;
}

const Course: React.FC = () => {
  const [course, setCourse] = useState({} as CourseData);
  const [currentModule, setCurrentModule] = useState({} as ModuleData | null);

  const history = useHistory();
  const handleSetModule = useCallback(
    (id: string) => {
      const selectedModule = course.modules.find(module => module.id === id);

      if (!selectedModule) {
        return;
      }

      setCurrentModule(selectedModule);
    },
    [course],
  );

  const handleGoToExame = useCallback(() => {
    history.push("/exame");
  }, [history]);

  useEffect(() => {
    const data: CourseData = {
      name: "Curso Bloqueio e Etiquetagem de Fontes de Energias Perigosas",
      thumbnail:
        "https://www.tagout.com.br/img/noticias/grande/b3ba995cf71dda366edff5d3a9861e47.png",
      released_on: new Date(2020, 5, 29),
      modules: [
        {
          id: "1223",
          name: "Introdução",
          extra_link: null,
          file_link:
            "https://expoforest.com.br/wp-content/uploads/2017/05/exemplo.pdf",
          video_link: null,
        },
        {
          id: "121132",
          name: "Acidentes e Doenças do Trabalho",
          extra_link: null,
          file_link:
            "https://expoforest.com.br/wp-content/uploads/2017/05/exemplo.pdf",
          video_link: "https://www.youtube.com/embed/jKzNQwF1oHU",
        },
        {
          id: "12das32",
          name: "Acidentes e Doenças do Trabalho",
          extra_link:
            "http://opensource.locaweb.com.br/locawebstyle-v2/manual/formularios/mascaras-forms/",
          file_link:
            "https://expoforest.com.br/wp-content/uploads/2017/05/exemplo.pdf",
          video_link: null,
        },
        {
          id: "122d2232",
          name: "Acidentes e Doenças do Tasdasd asdasd das dasrabalho",
          extra_link:
            "http://opensource.locaweb.com.br/locawebstyle-v2/manual/formularios/mascaras-forms/",
          file_link:
            "https://expoforest.com.br/wp-content/uploads/2017/05/exemplo.pdf",
          video_link: null,
        },
        {
          id: "12das32",
          name: "Acidentes e Doenças do Trabalho",
          extra_link:
            "http://opensource.locaweb.com.br/locawebstyle-v2/manual/formularios/mascaras-forms/",
          file_link:
            "https://expoforest.com.br/wp-content/uploads/2017/05/exemplo.pdf",
          video_link: null,
        },
        {
          id: "122d2232",
          name: "Acidentes e Doenças do Tasdasd asdasd das dasrabalho",
          extra_link:
            "http://opensource.locaweb.com.br/locawebstyle-v2/manual/formularios/mascaras-forms/",
          file_link:
            "https://expoforest.com.br/wp-content/uploads/2017/05/exemplo.pdf",
          video_link: null,
        },
        {
          id: "12das32",
          name: "Acidentes e Doenças do Trabalho",
          extra_link:
            "http://opensource.locaweb.com.br/locawebstyle-v2/manual/formularios/mascaras-forms/",
          file_link:
            "https://expoforest.com.br/wp-content/uploads/2017/05/exemplo.pdf",
          video_link: null,
        },
        {
          id: "122d2232",
          name: "Acidentes e Doenças do Tasdasd asdasd das dasrabalho",
          extra_link:
            "http://opensource.locaweb.com.br/locawebstyle-v2/manual/formularios/mascaras-forms/",
          file_link:
            "https://expoforest.com.br/wp-content/uploads/2017/05/exemplo.pdf",
          video_link: null,
        },
        {
          id: "12das32",
          name: "Acidentes e Doenças do Trabalho",
          extra_link:
            "http://opensource.locaweb.com.br/locawebstyle-v2/manual/formularios/mascaras-forms/",
          file_link:
            "https://expoforest.com.br/wp-content/uploads/2017/05/exemplo.pdf",
          video_link: null,
        },
        {
          id: "122d2232",
          name: "Acidentes e Doenças do Tasdasd asdasd das dasrabalho",
          extra_link:
            "http://opensource.locaweb.com.br/locawebstyle-v2/manual/formularios/mascaras-forms/",
          file_link:
            "https://expoforest.com.br/wp-content/uploads/2017/05/exemplo.pdf",
          video_link: null,
        },
        {
          id: "12das32",
          name: "Acidentes e Doenças do Trabalho",
          extra_link:
            "http://opensource.locaweb.com.br/locawebstyle-v2/manual/formularios/mascaras-forms/",
          file_link:
            "https://expoforest.com.br/wp-content/uploads/2017/05/exemplo.pdf",
          video_link: null,
        },
        {
          id: "122d2232",
          name: "Acidentes e Doenças do Tasdasd asdasd das dasrabalho",
          extra_link:
            "http://opensource.locaweb.com.br/locawebstyle-v2/manual/formularios/mascaras-forms/",
          file_link:
            "https://expoforest.com.br/wp-content/uploads/2017/05/exemplo.pdf",
          video_link: null,
        },
      ],
    };

    setCourse(data);
    // setCurrentModule(data.modules[0]);
    setCurrentModule(null);
  }, []);

  return (
    <Container>
      <main>
        <Header>
          <h1>{currentModule ? currentModule.name : "Fazer Prova"}</h1>

          {currentModule && (
            <>
              <div>
                {currentModule.extra_link && (
                  <a
                    href={currentModule?.extra_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MdLink size={20} /> Link extra
                  </a>
                )}
                <a
                  href={currentModule?.file_link}
                  download={currentModule?.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MdFileDownload size={20} /> Baixar material
                </a>
              </div>
            </>
          )}
        </Header>
        <section>
          {currentModule ? (
            <>
              {currentModule.video_link ? (
                <iframe
                  src={currentModule.video_link}
                  title={currentModule.name}
                  allowFullScreen
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                />
              ) : (
                <iframe
                  src={currentModule.file_link}
                  frameBorder="0"
                  allowFullScreen={false}
                  title={currentModule.name}
                />
              )}
            </>
          ) : (
            <ExameDetail>
              <section>
                <h2>Como funciona</h2>
                <ul>
                  <li>
                    <MdCheck size={24} />
                    <p>
                      Receberá certificado caso tenha menção
                      <strong> SATISFATÓRIA</strong>.
                    </p>
                  </li>
                  <li>
                    <MdCheck size={24} />
                    <p>
                      Poderá refazer a prova caso tenha menção
                      <strong> INSATISFATÓRIA</strong>.
                    </p>
                  </li>
                  <li>
                    <MdCheck size={24} />
                    <p>
                      Essa é uma
                      <strong> prova teórica</strong> e
                      <strong> objetiva</strong>.
                    </p>
                  </li>
                  <li>
                    <MdCheck size={24} />
                    <p>
                      Somente <strong>uma questão</strong> é a
                      <strong> correta</strong>.
                    </p>
                  </li>
                </ul>
              </section>

              <Button onClick={handleGoToExame}>Fazer prova</Button>
            </ExameDetail>
          )}
        </section>
      </main>
      <div>
        <aside>
          <header>
            <img src={course.thumbnail} alt={course.name} />
            <p>{course.name}</p>
          </header>
          <ul>
            {course.modules?.map(module => (
              <ModuleItem
                key={module.id}
                module={module}
                selectedModule={currentModule?.id}
                handleSetModule={handleSetModule}
              />
            ))}
          </ul>

          <button type="button" onClick={() => setCurrentModule(null)}>
            <FaTools size={24} /> Fazer prova
          </button>
        </aside>
        <p>
          Seu acesso a esse curso expira em
          <strong>
            {` ${course.released_on?.getDate() - new Date().getDate()} `}
            dias
          </strong>
        </p>
      </div>
    </Container>
  );
};

export default Course;
