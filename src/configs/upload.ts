import multer from "multer";
import { resolve } from "path";
import crypto from "crypto";

const TMP_FOLDER = resolve(__dirname, "..", "..", "tmp");

const UPLOAD_FOLDER = resolve(TMP_FOLDER, "uploads");

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(req, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

export { MULTER, TMP_FOLDER, UPLOAD_FOLDER };
