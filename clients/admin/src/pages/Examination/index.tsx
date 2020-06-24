import React, { useCallback, useState, useRef, useEffect } from "react";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { Scope, FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";

import Button from "~/components/Button";
import Radio from "~/components/Input/Radio";
import TextArea from "~/components/TextArea";
import api from "~/services/api";

import Select from "./Select";
import {
  Container,
  Title,
  Questions,
  AddQuestionButton,
  Question,
  Answer,
  RemoveQuestionButton,
} from "./styles";

interface CourseProps {
  label: string;
  value: string;
}

interface CourseResponse {
  id: string;
  name: string;
}

interface QuestionDataProps {
  id?: string;
  title: string;
  answer_a: string;
  answer_b: string;
  answer_c: string;
  answer_d: string;
  correct_answer: string;
}

interface FormDataProps {
  course_id: string;
  questions: Array<QuestionDataProps>;
}

const Examination: React.FC = () => {
  const examFormRef = useRef<FormHandles>(null);

  const [courses, setCourses] = useState<CourseProps[]>([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  const [formData, setFormData] = useState<FormDataProps>({
    questions: [{}],
  } as FormDataProps);

  const history = useHistory();

  // Load Courses
  useEffect(() => {
    api
      .get<CourseResponse[]>("/courses")
      .then(response => {
        const courseData = response.data;

        const courseFormattedData = courseData.map(course => ({
          label: course.name,
          value: course.id,
        }));

        setCourses(courseFormattedData);
      })
      .catch(() => {
        toast.error("Falha ao buscar dados dos cursos.");
      });
  }, []);

  // Load Course Exam
  useEffect(() => {
    async function loadCoursesExam(): Promise<void> {
      if (selectedCourse) {
        try {
          const response = await api.get(`/courses/${selectedCourse}/exams`);
          console.log("Exams", response.data);

          if (response.data.length < 1) {
            setFormData({
              course_id: selectedCourse,
              questions: [{}],
            } as FormDataProps);

            return;
          }

          setFormData({
            course_id: selectedCourse,
            questions: response.data,
          });
        } catch (error) {
          toast.error("Erro ao carregar informações da prova.");
        }
      }
    }

    loadCoursesExam();
  }, [selectedCourse]);

  const handleCourseSelect = useCallback(async event => {
    const course_id = event.target.value;

    setSelectedCourse(course_id);
  }, []);

  const getQuestionsState = useCallback((): QuestionDataProps[] => {
    const data = examFormRef.current?.getData() as FormDataProps;

    const correct_answers_data = data.questions.map(question => {
      const markAnswer = Object.entries(question).find(item => {
        const [key, value] = Object.values(item);

        if (key.includes("correct_answer") && value !== null) {
          return value;
        }

        return null;
      });

      let correct_answer = "";

      if (markAnswer) {
        correct_answer = String(markAnswer[1]);
      }

      return correct_answer;
    });

    const answersMarked = formData.questions.map(({ id }, index) => ({
      title: data.questions[index].title,
      answer_a: data.questions[index].answer_a,
      answer_b: data.questions[index].answer_b,
      answer_c: data.questions[index].answer_c,
      answer_d: data.questions[index].answer_d,
      correct_answer: correct_answers_data[index],
      ...(id ? { id } : {}),
    }));

    return answersMarked;
  }, [formData.questions]);

  const handleAddQuestion = useCallback(() => {
    const questions = getQuestionsState();

    setFormData({
      course_id: selectedCourse,
      questions: [
        ...questions,
        {
          title: "",
          answer_a: "",
          answer_b: "",
          answer_c: "",
          answer_d: "",
          correct_answer: "",
        },
      ],
    });
  }, [getQuestionsState, selectedCourse]);

  const handleRemoveQuestion = useCallback(
    async (indexToRemove: number) => {
      try {
        const questions = getQuestionsState();

        const question_id = questions[indexToRemove].id;

        if (question_id) {
          await api.delete(`/courses/${selectedCourse}/exams/${question_id}`);
        }

        setFormData(state => ({
          ...state,
          questions: questions.filter((_, index) => index !== indexToRemove),
        }));

        toast.success("Questão deletada.");
      } catch (error) {
        toast.error("Erro ao deletar questão.");
      }
    },
    [getQuestionsState, selectedCourse],
  );

  const handleSubmit = useCallback(async () => {
    const questions = getQuestionsState();

    try {
      const exam = { course_id: selectedCourse, questions };

      const schema = Yup.object().shape({
        course_id: Yup.string().required(),
        questions: Yup.array().of(
          Yup.object().shape({
            title: Yup.string().required(),
            answer_a: Yup.string().required(),
            answer_b: Yup.string().required(),
            answer_c: Yup.string().required(),
            answer_d: Yup.string().required(),
            correct_answer: Yup.string()
              .oneOf(["answer_a", "answer_b", "answer_c", "answer_d"])
              .required(),
          }),
        ),
      });

      await schema.validate(exam, { abortEarly: false });

      await api.post("/exams", exam);

      toast.success("Prova criada/atualizada com sucesso.");

      history.push("/dashboard");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        toast.error(
          "Erro ao criar prova.Por favor, verifique se todos os campos estão preenchidos",
        );

        return;
      }
      toast.error("Erro ao criar prova. Por favor, tente novamente.");
    }
  }, [getQuestionsState, selectedCourse, history]);

  return (
    <Container>
      <header>
        <h1>Cadastrar Prova</h1>
        <Select
          title="Curso"
          name="course_id"
          options={courses}
          value={selectedCourse}
          onChange={handleCourseSelect}
        />
        <h3>Questões</h3>
      </header>
      <Form
        onSubmit={handleSubmit}
        initialData={formData}
        ref={examFormRef}
        id="examFormRef"
      >
        <Questions>
          {formData.questions.map((_, index) => (
            <Scope path={`questions[${index}]`} key={Math.random()}>
              {formData.questions.length > 1 && (
                <RemoveQuestionButton
                  icon={FaRegTrashAlt}
                  onClick={() => {
                    handleRemoveQuestion(index);
                  }}
                >
                  Remover Questão
                </RemoveQuestionButton>
              )}
              <Question>
                <Title>
                  <TextArea
                    name="title"
                    title={`Pergunta ${index + 1}`}
                    placeholder="Digite a pergunta"
                  />
                </Title>

                <hr />

                <section>
                  <Answer>
                    <section>
                      <Radio name="correct_answer" title="A" value="answer_a" />
                    </section>
                    <TextArea
                      name="answer_a"
                      title=""
                      placeholder="Digite a resposta"
                    />
                  </Answer>
                  <Answer>
                    <section>
                      <Radio name="correct_answer" title="B" value="answer_b" />
                    </section>
                    <TextArea
                      name="answer_b"
                      title=""
                      placeholder="Digite a resposta"
                    />
                  </Answer>
                  <Answer>
                    <section>
                      <Radio name="correct_answer" title="C" value="answer_c" />
                    </section>
                    <TextArea
                      name="answer_c"
                      title=""
                      placeholder="Digite a resposta"
                    />
                  </Answer>
                  <Answer>
                    <section>
                      <Radio name="correct_answer" title="D" value="answer_d" />
                    </section>
                    <TextArea
                      name="answer_d"
                      title=""
                      placeholder="Digite a resposta"
                    />
                  </Answer>
                </section>
              </Question>
            </Scope>
          ))}
          <AddQuestionButton icon={FaPlus} onClick={handleAddQuestion}>
            Adicionar Questão
          </AddQuestionButton>
        </Questions>
        <Button type="submit">Cadastrar/Atualizar Prova</Button>
      </Form>
    </Container>
  );
};

export default Examination;
