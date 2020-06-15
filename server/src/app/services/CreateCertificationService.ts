/* eslint-disable import/no-duplicates */
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import fs from "fs";
import hbs from "handlebars";
import hbsPdf from "handlebars-pdf";
import path from "path";

interface PdfCreatorDTO {
  name: string;
  rg: string;
  course: {
    name: string;
    workload: number;
    category: string;
    learns: string[];
  };
}

// Verificando qual lib irei usar para gerar os PDF's
export default class CreateCertificationService {
  public async execute({ name, rg, course }: PdfCreatorDTO): Promise<void> {
    const htmlPath = path.resolve(
      __dirname,
      "..",
      "views",
      "templates",
      "certification.hbs",
    );

    const context = {
      name,
      rg,
      course,
      dateFormatted: `Jataí - GO, ${format(
        new Date(),
        "dd 'de' MMMM 'de' yyyy",
        { locale: ptBR },
      )}`,
    };

    const document = {
      template: fs.readFileSync(htmlPath, "utf8"),
      context,
      path: `./test-${Math.random()}.pdf`,
      options: {
        orientation: "landscape",
      },
    };

    hbsPdf
      .create(document)
      .then((res: any) => {
        console.log("res", res);
      })
      .catch((error: any) => {
        console.error(error);
      });

    // const bodyContent = `Certificamos que ${name}, portador do RG:${rg}
    // concluiu com aproveitamento o curso de ${course.name}, de 13 a 17 de Janeiro de 2020,
    // com carga horária de ${course.workload} horas,
    // de acordo com a ${course.category}.`;

    // pdf.text(bodyContent);

    // pdf.end();
  }
}
