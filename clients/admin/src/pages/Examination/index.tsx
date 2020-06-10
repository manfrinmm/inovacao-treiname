import React, { useCallback, useState, useRef, useEffect } from "react";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

import { Scope, FormHandles } from "@unform/core";
import { Form } from "@unform/web";

import Button from "~/components/Button";
import Radio from "~/components/Input/Radio";
import Select from "~/components/Input/Select";
import TextArea from "~/components/TextArea";
import api from "~/services/api";

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

  const [formData, setFormData] = useState<FormDataProps>({} as FormDataProps);

  const handleCourseSelect = useCallback(async event => {
    const course_id = event.target.value;
    setSelectedCourse(course_id);
  }, []);

  const getQuestionsState = useCallback((): QuestionDataProps[] => {
    const data = examFormRef.current?.getData() as FormDataProps;

    const answersMarked = data.questions.map(question => {
      const markAnswer = Object.entries(question).find(item => {
        const valueArray = Object.values(item);

        if (
          valueArray[0].includes("correct_answer") &&
          valueArray[1] !== null
        ) {
          return item[1];
        }
      });

      let correct_answer;
      if (markAnswer) {
        correct_answer = markAnswer[1] as unknown;
      }

      return { ...question, correct_answer: correct_answer as string };
    });

    return answersMarked;
  }, []);

  const handleAddQuestion = useCallback(() => {
    const questions = getQuestionsState();
    console.log("questions", questions);

    // examFormRef.current?.setData({
    //   course_id: selectedCourse,
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
      course_id: formData.course_id,
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
  }, [getQuestionsState, formData]);

  const handleRemoveQuestion = useCallback(
    async (indexToRemove: number) => {
      try {
        const questions = getQuestionsState();

        const question_id = questions[indexToRemove].id;

        if (question_id) {
          const course_id = examFormRef.current?.getFieldValue("course_id");
          await api.delete(`/courses/${course_id}/exams/${question_id}`);
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

  const handleSubmit = useCallback(
    async data => {
      const questions = getQuestionsState();

      try {
        const exam = { course_id: data.course_id, questions };
        // await api.post("/exams", exam);
        console.log("exam", exam);

        // toast.success("Prova criada com sucesso.");
      } catch (error) {
        toast.error("Erro ao criar prova.");
      }
    },
    [getQuestionsState],
  );

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
    if (selectedCourse) {
      api.get(`/courses/${selectedCourse}/exams`).then(response => {
        console.log(response.data);

        if (response.data.length < 1) {
          examFormRef.current?.setData({
            course_id: "",
            questions: [],
          });
          setFormData({ course_id: "", questions: [{}] } as FormDataProps);
          return;
        }

        // examFormRef.current?.setData({
        //   course_id: selectedCourse,
        //   questions: response.data,
        // });

        setFormData({ course_id: selectedCourse, questions: response.data });
      });
    }

    examFormRef.current?.setData({
      course_id: "",
      questions: [],
    });

    setFormData({ course_id: "", questions: [{}] } as FormDataProps);
  }, [selectedCourse]);

  return (
    <Container>
      <Form
        onSubmit={handleSubmit}
        initialData={formData}
        ref={examFormRef}
        id="examFormRef"
      >
        <header>
          <h1>Cadastrar Prova</h1>
          <Select
            title="Curso"
            name="course_id"
            options={courses}
            // value={formData.course_id}
            onChange={handleCourseSelect}
          />
          <h3>Questões</h3>
        </header>

        <Questions>
          {formData.questions?.map((question, index) => (
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
                    title="Pergunta"
                    placeholder="Digite a pergunta"
                  />
                </Title>

                <hr />

                <section>
                  <Answer isMarked={question.correct_answer === "answer_a"}>
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
                  <Answer isMarked={question.correct_answer === "answer_b"}>
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
                  <Answer isMarked={question.correct_answer === "answer_c"}>
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
                  <Answer isMarked={question.correct_answer === "answer_d"}>
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
