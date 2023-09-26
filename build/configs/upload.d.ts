import multer from "multer";
declare const TMP_FOLDER: string;
declare const UPLOAD_FOLDER: string;
declare const MULTER: {
    storage: multer.StorageEngine;
};
export { MULTER, TMP_FOLDER, UPLOAD_FOLDER };
