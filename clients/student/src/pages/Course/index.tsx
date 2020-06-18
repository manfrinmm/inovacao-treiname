import React, { useState, useEffect, useCallback } from "react";
import { FaTools } from "react-icons/fa";
import { MdLink, MdFileDownload, MdCheck } from "react-icons/md";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "~/components/Button";
import api from "~/services/api";

import ModuleItem from "./ModuleItem";
import { Container, Header, ExameDetail } from "./styles";

interface ModuleData {
  id: string;
  name: string;
  video_link: string | null;
  extra_link: string | null;
  file_url: string;
}

interface CourseData {
  name: string;
  thumbnail_url: string;
  modules: ModuleData[];
  days_remaining: number;
}
interface ExamStatusData {
  certification: string | null;
  exam_submit_id: string | null;
  exam_stage: "Visualizar prova" | "Fazer prova" | "Refazer prova";
  practical_exam_url?: string;
  accuracy: number;
}

const Course: React.FC = () => {
  const [course, setCourse] = useState({} as CourseData);
  const [currentModule, setCurrentModule] = useState({} as ModuleData | null);
  const [examStatus, setExamStatus] = useState({} as ExamStatusData);

  const history = useHistory();
  const { course_id } = useParams();

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

  const handleClickExam = useCallback(async () => {
    const loadInfo = toast.info(
      "Carregando informações para fazer a prova...",
      { autoClose: false },
    );

    try {
      toast.dismiss(loadInfo);

      const examStatusResponse = await api.get(
        `/users/exams/${course_id}/status`,
      );

      const {
        exam_submit_id,
        certification,
        accuracy,
        practical_exam_url,
      } = examStatusResponse.data;

      if (accuracy) {
        const exam_stage =
          accuracy >= 0.7 ? "Visualizar prova" : "Refazer prova";

        setExamStatus(state => ({
          ...state,
          exam_submit_id,
          certification,
          exam_stage,
          practical_exam_url,
          accuracy,
        }));
      } else {
        setExamStatus(state => ({
          ...state,
          exam_submit_id,
          certification,
          exam_stage: "Fazer prova",
          accuracy,
        }));
      }

      setCurrentModule(null);
    } catch (error) {
      toast.error("Erro ao carregar informações para fazer a prova.");
    }
  }, [course_id]);

  const handleGoToExame = useCallback(async () => {
    let pageToGo = "";

    if (
      examStatus.exam_stage === "Fazer prova" ||
      examStatus.exam_stage === "Refazer prova"
    ) {
      pageToGo = `/course/${course_id}/exam`;
    } else if (examStatus.exam_stage === "Visualizar prova") {
      pageToGo = `/exam/${examStatus.exam_submit_id}/result`;
    }

    history.push(pageToGo);
  }, [history, course_id, examStatus]);

  const handleGoToCertificationDetail = useCallback(() => {
    const certification_id = examStatus.certification?.split(".pdf")[0];
    window.open(
      `${process.env.REACT_APP_SITE_URL}/certification/${certification_id}`,
    );
  }, [examStatus.certification]);

  const handleGoToPracticalExamInstructions = useCallback(() => {
    window.open(examStatus.practical_exam_url);
  }, [examStatus.practical_exam_url]);

  useEffect(() => {
    async function loadCourse(): Promise<void> {
      try {
        await api.get(`users/courses/${course_id}`).then(response => {
          const courseResponse = response.data;

          setCourse(courseResponse);
          setCurrentModule(courseResponse.modules[0]);
        });
      } catch (error) {
        toast.error("Erro ao carregar curso.");

        history.push("/dashboard");
      }
    }

    loadCourse();
  }, [course_id, history]);

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
                  href={currentModule?.file_url}
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
                  src={currentModule.file_url}
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

              <Button onClick={handleGoToExame}>{examStatus.exam_stage}</Button>

              {examStatus.practical_exam_url && examStatus.accuracy >= 0.7 && (
                <Button onClick={handleGoToPracticalExamInstructions}>
                  Visualizar instruções de prova prática
                </Button>
              )}

              {examStatus.certification && (
                <Button onClick={handleGoToCertificationDetail}>
                  Visualizar certificado
                </Button>
              )}
            </ExameDetail>
          )}
        </section>
      </main>
      <div>
        <aside>
          <header>
            <img src={course.thumbnail_url} alt={course.name} />
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

          <button type="button" onClick={handleClickExam}>
            <FaTools size={24} /> Fazer prova
          </button>
        </aside>
        <p>
          Seu acesso a esse curso expira em
          <strong> {course.days_remaining} dias</strong>
        </p>
      </div>
    </Container>
  );
};

export default Course;
