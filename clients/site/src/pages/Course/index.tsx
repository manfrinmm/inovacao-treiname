import React, { useEffect, useState, useCallback } from "react";
import { FaFileDownload, FaCertificate } from "react-icons/fa";
import { MdAccessTime, MdTimelapse, MdCheck } from "react-icons/md";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";
import qs from "qs";
import convertXml from "xml-js";

import Button from "~/components/Button";
import { useAuth } from "~/hooks/auth";
import api from "~/services/api";

import ModuleItem from "./ModuleItem";
import { Container, Info, WillLearn, LearnItem, Modules } from "./styles";

interface CourseProps {
  name: string;
  category: string;
  modality: string;
  description: string;
  target_audience: string;
  learns: string[];
  modules: Array<{
    name: string;
    description: string;
  }>;
  thumbnail_url: string;
  value: number;
  docs_download: number;
  course_expiration: number;
  workload: number;
  illustrative_video?: string;
  purchase_state?: string;
}

const Course: React.FC = () => {
  const [course, setCourse] = useState({} as CourseProps);

  const { course_id } = useParams();
  const history = useHistory();

  const { user } = useAuth();

  useEffect(() => {
    async function loadCourseInfo(): Promise<void> {
      try {
        const response = await api.get(`/courses/${course_id}`);

        setCourse(response.data);

        if (user) {
          const purchaseStatusResponse = await api.get(
            `/users/courses/${course_id}/purchase-status`,
          );

          setCourse(state => ({ ...state, ...purchaseStatusResponse.data }));
        }
      } catch (error) {
        toast.error("Erro ao buscar informações do curso.");
        history.push("/");
      }
    }

    loadCourseInfo();
  }, [course_id, user, history]);

  const handleBuyCourse = useCallback(async () => {
    const checkoutCodeUrl =
      process.env.NODE_ENV === "development"
        ? `https://cors-anywhere.herokuapp.com/${process.env.REACT_APP_CHECKOUT_CODE_URL}`
        : (process.env.REACT_APP_CHECKOUT_CODE_URL as string);

    const data = {
      currency: "BRL",
      itemId1: course_id,
      itemDescription1: `Compra do curso: ${course.name}`,
      itemAmount1: course.value,
      itemQuantity1: 1,
      shippingAddressRequired: "false",
    };

    let toastInfo;

    try {
      toastInfo = toast.info(
        "Requisitando dados para compra do curso. Por favor aguarde...",
        {
          autoClose: false,
        },
      );

      const response = await axios.post(checkoutCodeUrl, qs.stringify(data), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const checkoutCode = JSON.parse(convertXml.xml2json(response.data))
        .elements[0].elements[0].elements[0].text;

      const urlCheckoutForm = `${process.env.REACT_APP_CHECKOUT_FORM_URL}${checkoutCode}`;

      window.open(urlCheckoutForm);

      history.push("/success");
    } catch (error) {
      toast.error(
        "Falha ao requisitar dados para compra do curso. Por favor, tente novamente!",
      );
    } finally {
      toast.dismiss(toastInfo);
    }
  }, [course_id, course.name, course.value, history]);

  const renderBuyButton = useCallback(() => {
    if (course.purchase_state === "acquired")
      return <Button disabled>Curso já adquirido</Button>;
    const buttonMessage =
      course.purchase_state === "expired" ? "Recomprar curso" : "Comprar curso";

    return <Button onClick={handleBuyCourse}>{buttonMessage}</Button>;
  }, [course.purchase_state, handleBuyCourse]);

  return (
    <Container>
      <aside>
        <img src={course.thumbnail_url} alt={course.name} />
        <h1>
          {Intl.NumberFormat("pt-br", {
            style: "currency",
            currency: "BRL",
          }).format(course.value)}
        </h1>
        {renderBuyButton()}

        <span>Pagamento processado pela PagSeguro</span>
        <Info>
          <p>Este curso inclui</p>
          <div>
            <FaFileDownload size={24} />
            <p>{`${course.modules?.length} materiais para download`}</p>
          </div>
          <div>
            <MdAccessTime size={24} />
            <p>{`Acesso por ${course.course_expiration} dias`}</p>
          </div>
          <div>
            <FaCertificate size={24} color="#F99000" />
            <p>Certificado de conclusão</p>
          </div>
          <div>
            <MdTimelapse size={24} />
            <p>{`${course.workload} horas de Carga Horária`}</p>
          </div>
        </Info>
      </aside>
      <article>
        <h1>{course.name}</h1>
        <section>
          <p>
            Categoria: <strong>{course.category}</strong>
          </p>
          <p>
            Modalidade:<strong> {course.modality}</strong>
          </p>
        </section>
        <p className="description">{course.description}</p>
        {course.illustrative_video && (
          <iframe
            title={course.name}
            src={course.illustrative_video}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        <h2>Para quem este curso é direcionado</h2>
        <p className="description">{course.target_audience}</p>
        <WillLearn>
          <h3>O que você aprenderá</h3>
          <div>
            {course.learns?.map(learn => (
              <LearnItem key={Math.random()}>
                <p>
                  <MdCheck /> {learn}
                </p>
              </LearnItem>
            ))}
          </div>
        </WillLearn>
        <h2>Conteúdo do curso</h2>
        <Modules>
          {course.modules?.map(module => (
            <ModuleItem data={module} key={Math.random()} />
          ))}
        </Modules>
      </article>
    </Container>
  );
};

export default Course;
