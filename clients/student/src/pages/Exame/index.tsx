import React, { useState, useEffect } from "react";

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
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          b:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          c:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          d:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
        },
        {
          id: String(Math.random()),
          title:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares, máscaras, mangotes, capacetes, luvas, botas, cintos de segurança, protetor solar e outros itens de proteção. Esses acessórios são indispensáveis em fábricas e processos industriais em geral.",
          a:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          b:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          c:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          d:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
        },
        {
          id: String(Math.random()),
          title:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares, máscaras, mangotes, capacetes, luvas, botas, cintos de segurança, protetor solar e outros itens de proteção. Esses acessórios são indispensáveis em fábricas e processos industriais em geral.",
          a:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          b:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          c:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          d:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
        },
        {
          id: String(Math.random()),
          title:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares, máscaras, mangotes, capacetes, luvas, botas, cintos de segurança, protetor solar e outros itens de proteção. Esses acessórios são indispensáveis em fábricas e processos industriais em geral.",
          a:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          b:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          c:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          d:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
        },
        {
          id: String(Math.random()),
          title:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares, máscaras, mangotes, capacetes, luvas, botas, cintos de segurança, protetor solar e outros itens de proteção. Esses acessórios são indispensáveis em fábricas e processos industriais em geral.",
          a:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          b:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          c:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          d:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
        },
        {
          id: String(Math.random()),
          title:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares, máscaras, mangotes, capacetes, luvas, botas, cintos de segurança, protetor solar e outros itens de proteção. Esses acessórios são indispensáveis em fábricas e processos industriais em geral.",
          a:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          b:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          c:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          d:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
        },
        {
          id: String(Math.random()),
          title:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares, máscaras, mangotes, capacetes, luvas, botas, cintos de segurança, protetor solar e outros itens de proteção. Esses acessórios são indispensáveis em fábricas e processos industriais em geral.",
          a:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          b:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          c:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          d:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
        },
        {
          id: String(Math.random()),
          title:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares, máscaras, mangotes, capacetes, luvas, botas, cintos de segurança, protetor solar e outros itens de proteção. Esses acessórios são indispensáveis em fábricas e processos industriais em geral.",
          a:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          b:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          c:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          d:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
        },
        {
          id: String(Math.random()),
          title:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares, máscaras, mangotes, capacetes, luvas, botas, cintos de segurança, protetor solar e outros itens de proteção. Esses acessórios são indispensáveis em fábricas e processos industriais em geral.",
          a:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          b:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          c:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
          d:
            "Todas as atividades profissionais que possam imprimir algum tipo de risco físico para o trabalhador devem ser cumpridas com o auxílio de EPIs – Equipamentos de Proteção Individual, que incluem óculos, protetores auriculares.",
        },
      ],
    };

    setExame(data);
  }, []);

  return (
    <Container>
      <h1>{exame.name}</h1>
      <section>
        {exame.questions?.map((question, index) => (
          <Question key={question.id} number={index} question={question} />
        ))}
      </section>
    </Container>
  );
};

export default Exame;
