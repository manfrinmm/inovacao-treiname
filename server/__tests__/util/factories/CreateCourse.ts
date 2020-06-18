import { getRepository } from "typeorm";

import Course from "../../../src/app/models/Course";

export default async function (): Promise<Course> {
  const coursesRepository = getRepository(Course);

  const course = coursesRepository.create({
    name: "Curso Bloqueio e Etiquetagem de Fontes de Energias Perigosas",
    category: "N10",
    modality: "Formação",
    workload: 8,
    value: 12000,
    description:
      "Instruir, orientar e capacitar trabalhadores em geral, que lidam com formas de energias perigosas, de forma a garantir a segurança dos funcionários, contratados e subcontratados, protegendo-os contra energização inesperada, ligações ou fuga das energias residuais durante a realização de serviços.",
    target_audience:
      "Trabalhadores em geral que executam serviços em com formas de energias perigosas e/ou que realizam serviços ou manutenção nos equipamentos  nergizados, tais como: instalação, construção, inspeção, limpeza, lubrificação, reparos, montagem e ajustes.",
    thumbnail:
      "https://www.portaldoseguro.com.br/wp-content/uploads/2019/03/homem-jovem-intrigado-segurando-a-testa-enquanto-se-sente-stress_1262-18026.jpg",
    course_expiration: 16,
    certificate_validity: 12,
    approved_by: "Matheus Menezes - CRA 123255",
    illustrative_video: "https://www.youtube.com/watch?v=jKzNQwF1oHU&t=1086s",
    learns: ["Ambiente de trabalho"],
    modules: [
      {
        name: "Introdução",
        description: "lalalala",
        video_link: "https://www.youtube.com/watch?v=FRhljZVQ0IM",
        file: "123easdasdas-indro",
      },
      {
        name: "Aplicação",
        description: "lalalala",
        video_link: "https://www.youtube.com/watch?v=FRhljZVQ0IM",
        extra_link:
          "https://gist.github.com/diego3g/5f23fb3f8f18fa9ec52669741cd156b3/revisions",
        file: "123easdasdas-indro",
      },
      {
        name: "Introdução33",
        description: "lalalala",
        file: "123easdasdas-indro",
      },
    ],
  });

  await coursesRepository.save(course);

  return course;
}
