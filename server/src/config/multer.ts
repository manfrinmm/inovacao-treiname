import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

const tmpFolder = resolve(__dirname, "..", "..", "tmp");

export default {
  tmpFolder,
  uploadFolder: resolve(tmpFolder, "uploads"),
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(req, file, cb) {
        const fileHash = crypto.randomBytes(10).toString("hex");
        const fileName = `${fileHash}-${file.originalname}`;

        return cb(null, fileName);
      },
    }),
  },
};
