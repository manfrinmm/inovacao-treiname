/* eslint-disable import/no-duplicates */
import crypto from "crypto";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import fs from "fs";
import hbs from "handlebars";
import path from "path";
import puppeteer from "puppeteer";

import uploadConfig from "../../config/multer";
import AppError from "../errors/AppError";

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

export default class CreateCertificationService {
  public async execute({ name, rg, course }: PdfCreatorDTO): Promise<string> {
    const logo_url = `${process.env.APP_API_URL}/templates/certification/logo.png`;
    const signature_image_url = `${process.env.APP_API_URL}/templates/certification/signature.jpeg`;
    const styles_url = `${process.env.APP_API_URL}/templates/certification/styles.css`;

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

    const context = {
      name,
      rg,
      course,
      localDateFormatted,
      logo_url,
      signature_image_url,
      styles_url,
    };

    const certificationName = `${crypto
      .randomBytes(10)
      .toString("hex")}-${name}.pdf`;

    const html = hbs.compile(fs.readFileSync(htmlPath, "utf8"))(context);

    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.setContent(html);
      await page.emulateMediaType("print");
      const pdf = await page.pdf({
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
