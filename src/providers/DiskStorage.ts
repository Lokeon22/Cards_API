import fs from "fs";
import { resolve } from "path";
import { TMP_FOLDER, UPLOAD_FOLDER } from "../configs/upload";

class DiskStorage {
  async saveFile(file: string) {
    await fs.promises.rename(resolve(TMP_FOLDER, file), resolve(UPLOAD_FOLDER, file));
    return file;
  }

  async deleteFile(file: string) {
    const filePath = resolve(UPLOAD_FOLDER, file);
    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    return fs.promises.unlink(filePath);
  }
}

export { DiskStorage };
