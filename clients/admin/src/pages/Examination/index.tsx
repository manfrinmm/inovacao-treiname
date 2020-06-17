import React, { useCallback, useState, useRef, useEffect } from "react";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { Scope, FormHandles } from "@unform/core";
import { Form } from "@unform/web";

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

// Falta verificar duplicidade de Questões quando muda a seleção de curso.

const Examination: React.FC = () => {
  const examFormRef = useRef<FormHandles>(null);

  const [courses, setCourses] = useState<CourseProps[]>([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  const [formData, setFormData] = useState<FormDataProps>({
    questions: [{}],
  } as FormDataProps);

  const history = useHistory();

  console.log("formData", formData);
  // examFormRef.current?.setData(formData.questions);

  const handleCourseSelect = useCallback(async event => {
    const course_id = event.target.value;
    setSelectedCourse(course_id);
  }, []);

  const getQuestionsState = useCallback((): QuestionDataProps[] => {
    const data = examFormRef.current?.getData() as FormDataProps;

    console.log("dataFormRef", data);
    const answersMarked = data.questions.map(question => {
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

      return { ...question, correct_answer };
    });

    return answersMarked;
  }, []);

  const handleAddQuestion = useCallback(() => {
    const questions = getQuestionsState();
    console.log("questions", questions);

    examFormRef.current?.reset({
      questions,
    });

    // examFormRef.current?.setData({
    //   questions: [
    //     ...questions,
    //     {
    //       title: "",
    //       answer_a: "",
    //       answer_b: "",
    //       answer_c: "",
    //       answer_d: "",
    //       correct_answer: "",
    //     },
    //   ],
    // });

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

        examFormRef.current?.setData({
          questions: questions.filter((_, index) => index !== indexToRemove),
        });

        console.log("questionsRemove", questions);

        const question_id = questions[indexToRemove].id;

        if (question_id) {
          // await api.delete(`/courses/${selectedCourse}/exams/${question_id}`);
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
    [getQuestionsState],
  );

  const handleSubmit = useCallback(async () => {
    const questions = getQuestionsState();

    try {
      const exam = { course_id: selectedCourse, questions };
      // await api.post("/exams", exam);
      console.log("exam", exam);

      const messageSuccess =
        formData.questions.length > 2
          ? "Prova criada com sucesso."
          : "Prova atualizada com sucesso.";

      toast.success(messageSuccess);

      // history.push("/dashboard");
    } catch (error) {
      toast.error("Erro ao criar prova.");
    }
  }, [getQuestionsState, selectedCourse, formData.questions.length]);

  useEffect(() => {
    api.get<CourseResponse[]>("/courses").then(response => {
      const courseData = response.data;

      const courseFormattedData = courseData.map(course => ({
        label: course.name,
        value: course.id,
      }));

      setCourses(courseFormattedData);
    });
  }, []);

  useEffect(() => {
    async function loadCoursesExam(): Promise<void> {
      examFormRef.current?.reset({});
      setFormData({ questions: [{}] } as FormDataProps);

      if (selectedCourse) {
        console.log("selectedCourse-in", selectedCourse);

        const response = await api.get(`/courses/${selectedCourse}/exams`);
        console.log(response.data);

        if (response.data.length < 1) {
          examFormRef.current?.setData({
            course_id: selectedCourse,
            questions: [{}],
          });
          setFormData({
            course_id: selectedCourse,
            questions: [{}],
          } as FormDataProps);

          return;
        }

        examFormRef.current?.setData({
          course_id: selectedCourse,
          questions: response.data,
        });

        setFormData({
          course_id: selectedCourse,
          questions: response.data,
        });

        return;
      }

      console.log("selectedCourse-out", selectedCourse);

      // examFormRef.current?.setData({
      //   course_id: "",
      //   questions: [{}],
      // });

      // setFormData({ course_id: "", questions: [{}] } as FormDataProps);
    }

    loadCoursesExam();
  }, [selectedCourse]);

  return (
    <Container>
      <header>
        <h1>Cadastrar Prova</h1>
        <Select
          title="Curso"
          name="course_id"
          options={courses}
          value={formData.course_id}
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
                      <Radio
                        name="correct_answer"
                        title="A"
                        radioValue="answer_a"
                      />
                    </section>
                    <TextArea
                      name="answer_a"
                      title=""
                      placeholder="Digite a resposta"
                    />
                  </Answer>
                  <Answer>
                    <section>
                      <Radio
                        name="correct_answer"
                        title="B"
                        radioValue="answer_b"
                      />
                    </section>
                    <TextArea
                      name="answer_b"
                      title=""
                      placeholder="Digite a resposta"
                    />
                  </Answer>
                  <Answer>
                    <section>
                      <Radio
                        name="correct_answer"
                        title="C"
                        radioValue="answer_c"
                      />
                    </section>
                    <TextArea
                      name="answer_c"
                      title=""
                      placeholder="Digite a resposta"
                    />
                  </Answer>
                  <Answer>
                    <section>
                      <Radio
                        name="correct_answer"
                        title="D"
                        radioValue="answer_d"
                      />
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
        <Button type="submit">
          {selectedCourse ? "Atualizar Prova" : "Cadastrar Prova"}
        </Button>
      </Form>
    </Container>
  );
};

export default Examination;
