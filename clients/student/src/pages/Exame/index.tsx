import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { Form } from "@unform/web";
import Button from "~/components/Button";

import Question from "./Question";
import { Container } from "./styles";

interface ExameData {
  name: string;
  questions: Array<{
    id: string;
    title: string;
    a: string;
    b: string;
    c: string;
    d: string;
  }>;
}

const Exame: React.FC = () => {
  const [exame, setExame] = useState({} as ExameData);

  const history = useHistory();

  const handleSubmit = useCallback(
    data => {
      console.log(data);

      history.push("/dashboard");
    },
    [history],
  );

  useEffect(() => {
    const data: ExameData = {
      name:
        "Prova de Curso Bloqueio e Etiquetagem de Fontes de Energias Perigosas",
      questions: [
        {
          id: String(Math.random()),
          title:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares, máscaras, mangotes, capacetes, luvas, botas, cintos de segurança, protetor solar e outros itens de proteção. Esses acessórios são indispensáveis em fábricas e processos industriais em geral.",
          a:
            "Todas as asdasdatividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          b:
            "Todas as adddtividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          c:
            "Todas as at123ividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          d:
            "Todas as 1233213 profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
        },
        {
          id: String(Math.random()),
          title:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares, máscaras, mangotes, capacetes, luvas, botas, cintos de segurança, protetor solar e outros itens de proteção. Esses acessórios são indispensáveis em fábricas e processos industriais em geral.",
          a:
            "Todas as atividades profissionais que posaaasam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          b:
            "Todas as atividades profissionais que dd imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          c:
            "Todas as atividades profissionais que possamddd imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          d:
            "Todas as ativasdidades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
        },
        {
          id: String(Math.random()),
          title:
            "Todas as ativiwqedades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares, máscaras, mangotes, capacetes, luvas, botas, cintos de segurança, protetor solar e outros itens de proteção. Esses acessórios são indispensáveis em fábricas e processos industriais em geral.",
          a:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          b:
            "Todas as atividades dsprofissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          c:
            "Todas as ativida123des profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          d:
            "Todas as atividades321 profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
        },

        {
          id: String(Math.random()),
          title:
            "Todas as atividades profissiona234is que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares, máscaras, mangotes, capacetes, luvas, botas, cintos de segurança, protetor solar e outros itens de proteção. Esses acessórios são indispensáveis em fábricas e processos industriais em geral.",
          a:
            "Todas as atividades profissio324nais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          b:
            "Todas as atividades profissionais que possam 234imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          c:
            "Todas as atividades profiss321ionais que poss123am imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          d:
            "Todas as atividades profissio123nais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
        },
      ],
    };

    setExame(data);
  }, []);

  return (
    <Container>
      <h1>{exame.name}</h1>
      <Form id="exameForm" onSubmit={handleSubmit}>
        <section>
          {exame.questions?.map((question, index) => (
            <Question key={question.id} number={index} question={question} />
          ))}
        </section>
      </Form>

      <Button type="submit" form="exameForm">
        Submeter prova
      </Button>

      <p>
        QUAL MENSAGEM COLOCAR?
        <br />
        Caso tenha conseguido menção <strong>SATISFATÓRIA</strong> você recebera
        seu certificado.
      </p>
    </Container>
  );
};

export default Exame;
