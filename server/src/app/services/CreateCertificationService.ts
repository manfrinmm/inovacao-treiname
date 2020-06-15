import Pdfkit from "pdfkit";

interface PdfCreatorDTO {
  name: string;
  rg: string;
  course: {
    name: string;
    workload: number;
    category: string;
  };
}

// Verificando qual lib irei usar para gerar os PDF's
export default class CreateCertificationService {
  public async execute({ name, rg, course }: PdfCreatorDTO): Promise<void> {
    const pdf = new Pdfkit();

    const bodyContent = `Certificamos que ${name}, portador do RG:${rg}
    concluiu com aproveitamento o curso de ${course.name}, de 13 a 17 de Janeiro de 2020,
    com carga horária de ${course.workload} horas,
    de acordo com a ${course.category}.`;

    pdf.text(bodyContent);

    pdf.end();
  }
}
