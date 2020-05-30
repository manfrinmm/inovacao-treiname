import fs from "fs";
import path from "path";

import multerConfig from "../../config/multer";

class DiskStorageProvider {
  public async saveFile(file: string): Promise<void> {
    await fs.promises.rename(
      path.resolve(multerConfig.tmpFolder, file),
      path.resolve(multerConfig.uploadFolder, file),
    );
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(multerConfig.uploadFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch (error) {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default new DiskStorageProvider();
