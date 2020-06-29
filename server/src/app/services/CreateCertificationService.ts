/* eslint-disable import/no-duplicates */
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import fs from "fs";
import hbs from "handlebars";
import path from "path";
import puppeteer from "puppeteer";
import { uuid } from "uuidv4";

import uploadConfig from "../../config/multer";
import AppError from "../errors/AppError";

interface PdfCreatorDTO {
  name: string;
  rg: string;
  course: {
    name: string;
    workload: number;
    category: string;
    approved_by: string;
    certificate_validity: number;
    learns: string[];
  };
  released_on: Date;
}

export default class CreateCertificationService {
  public async execute({
    name,
    rg,
    course,
    released_on,
  }: PdfCreatorDTO): Promise<string> {
    const logo_url = `${process.env.APP_API_URL}/templates/certification/logo.png`;
    const signature_image_url = `${process.env.APP_API_URL}/templates/certification/signature.jpeg`;
    const styles_url = `${process.env.APP_API_URL}/templates/certification/styles.css`;
    const site_web_url = process.env.SITE_WEB_URL;

    const htmlPath = path.resolve(
      __dirname,
      "..",
      "views",
      "templates",
      "certification",
      "certification.hbs",
    );

    const certificationsFolder = path.resolve(
      uploadConfig.tmpFolder,
      "certifications",
    );

    const localDateFormatted = `Jataí - GO, ${format(
      new Date(),
      "dd 'de' MMMM 'de' yyyy",
      { locale: ptBR },
    )}`;

    function formatDate(date: Date) {
      return format(date, "dd'/'MM'/'yyyy'");
    }

    const period = `${formatDate(released_on)} a ${formatDate(new Date())}`;

    const code = uuid();

    const context = {
      name,
      rg,
      course,
      localDateFormatted,
      logo_url,
      signature_image_url,
      styles_url,
      period,
      code,
      site_web_url,
    };

    const certificationName = `${code}.pdf`;

    const html = hbs.compile(fs.readFileSync(htmlPath, "utf8"))(context);

    try {
      const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const page = await browser.newPage();

      await page.setContent(html);
      await page.emulateMediaType("print");
      await page.pdf({
        path: `${certificationsFolder}/${certificationName}`,
        landscape: true,
        printBackground: true,
      });

      await browser.close();

      return certificationName;
    } catch (error) {
      console.log(error);

      throw new AppError(error);
    }
  }
}
