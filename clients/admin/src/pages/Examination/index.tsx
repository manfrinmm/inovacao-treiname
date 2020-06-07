import React, { useCallback, useState, useRef, useEffect } from "react";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";

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
  const examForm = useRef<FormHandles>(null);

  const [courses, setCourses] = useState<CourseProps[]>([]);

  const [formData, setFormData] = useState<FormDataProps>({
    questions: [{ title: "lkakkaaa", correct_answer: "answer_b" }],
  } as FormDataProps);

  const getQuestionsState = useCallback((): QuestionDataProps[] => {
    const inputValues: QuestionDataProps[] = [];

    for (let index = 0; index < formData.questions.length; index++) {
      const title = examForm.current?.getFieldValue(
        `questions[${index}].title`,
      );

      const answer_a = examForm.current?.getFieldValue(
        `questions[${index}].answer_a`,
      );

      const answer_b = examForm.current?.getFieldValue(
        `questions[${index}].answer_b`,
      );

      const answer_c = examForm.current?.getFieldValue(
        `questions[${index}].answer_c`,
      );

      const answer_d = examForm.current?.getFieldValue(
        `questions[${index}].answer_d`,
      );

      const correct_answer = examForm.current?.getFieldValue(
        `questions[${index}].correct_answer`,
      );
      console.log("correct_answer", correct_answer);

      inputValues[index] = {
        title,
        answer_a,
        answer_b,
        answer_c,
        answer_d,
        correct_answer,
      };

      console.log(inputValues[index]);

      const question_id = formData.questions[index].id;

      if (question_id) {
        Object.assign(inputValues[index], { id: question_id });
      }
    }

    return inputValues;
  }, [formData.questions]);

  const handleAddQuestion = useCallback(() => {
    const questions = getQuestionsState();

    setFormData(state => ({
      ...state,
      questions: [
        ...questions,
        {
          title: "",
          answer_a: "",
          answer_b: "",
          answer_c: "",
          answer_d: "",
          correct_answer: "answer_c",
        },
      ],
    }));
  }, [getQuestionsState]);

  const handleRemoveQuestion = useCallback(
    async (indexToRemove: number) => {
      const questions = getQuestionsState();

      const question_id = questions[indexToRemove].id;

      if (question_id) {
        // await api.delete(`/modules/${question_id}`);
        console.log("Questão deletada.");
      }

      setFormData(state => ({
        ...state,
        questions: questions.filter((_, index) => index !== indexToRemove),
      }));
    },
    [getQuestionsState],
  );

  const handleSubmit = useCallback(data => {
    console.log(data.questions[0]);
    console.log(data);
  }, []);

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

  return (
    <Container>
      <Form
        onSubmit={handleSubmit}
        initialData={formData}
        ref={examForm}
        id="examForm"
      >
        <header>
          <h1>Cadastrar Prova</h1>
          <Select title="Curso" name="course_id" options={courses} />
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
                        onClick={() => {
                          examForm.current?.setFieldValue(
                            "questions[0].correct_answer",
                            "answer_c",
                          );
                        }}
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
        <Button type="submit">Cadastrar Prova</Button>
      </Form>
    </Container>
  );
};

export default Examination;
