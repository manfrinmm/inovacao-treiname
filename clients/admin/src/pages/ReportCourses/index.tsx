import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import api from "~/services/api";

import { Container, Report } from "./styles";

interface ReportCoursesDataProps {
  name: string;
  approved_by: string;
  category: string;
  modality: string;
  value: number;
  value_formatted: string;
  total_value: number;
  total_value_formatted: string;
  total_sales: number;
}

const ReportCourses: React.FC = () => {
  const [reportCoursesData, setReportCoursesData] = useState<
    ReportCoursesDataProps[]
  >([]);

  const history = useHistory();

  useEffect(() => {
    api
      .get<ReportCoursesDataProps[]>("/admins/reports")
      .then(response => {
        const reportFormatted = response.data.map<ReportCoursesDataProps>(
          report => ({
            ...report,
            value_formatted: Intl.NumberFormat("pt-br", {
              style: "currency",
              currency: "BRL",
            }).format(report.value),
            total_value_formatted: Intl.NumberFormat("pt-br", {
              style: "currency",
              currency: "BRL",
            }).format(report.total_value),
          }),
        );

        setReportCoursesData(reportFormatted);
      })
      .catch(() => {
        toast.error("Falha ao pegar os dados para gerar o relatório.");
        history.push("/dashboard");
      });
  }, [history]);

  return (
    <Container>
      <header>
        <h1>Relatório de cursos</h1>
      </header>

      <Report>
        <section>
          <table>
            <thead>
              <tr>
                <td>Nome</td>
                <td>Aprovado por</td>
                <td>Categoria</td>
                <td>Modalidade</td>
                <td>Valor do curso</td>
                <td>Total vendido</td>
                <td>Quantidade vendido</td>
              </tr>
            </thead>
            <tbody>
              {reportCoursesData.map(reportCourse => (
                <tr key={Math.random()}>
                  <td>{reportCourse.name}</td>
                  <td>{reportCourse.approved_by}</td>
                  <td>{reportCourse.category}</td>
                  <td>{reportCourse.modality}</td>
                  <td>{reportCourse.value_formatted}</td>
                  <td>{reportCourse.total_value_formatted}</td>
                  <td>{reportCourse.total_sales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </Report>
    </Container>
  );
};

export default ReportCourses;
