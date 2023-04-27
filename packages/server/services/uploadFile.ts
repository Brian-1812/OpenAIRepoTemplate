import * as fs from "fs";
import multer from "multer";
import path from "path";
import { IRequest } from "../types";
import { getUserUploadsFolderPath } from "../utils";
// const fileFilter = (req: Request, file, cb) => {
//   if (file.mimetype.includes("pdf")) {
//     cb(null, true);
//   } else {
//     console.log("Not a pdf! Errroroororororo here");
//     cb("Please upload only pdf.", false);
//   }
// };

const storage = multer.diskStorage({
  destination: (req: IRequest, file, cb) => {
    console.log("req.token", req.token);
    if (!req.token?.id) {
      return cb(new Error("Invalid User"), "");
    }
    const dir = getUserUploadsFolderPath(req.token?.id);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    req.params = { ...req.params, directoryPath: dir };
    cb(null, path.resolve(dir));
  },
  filename: (req, file, cb) => {
    console.log("file", file);
    cb(null, file.originalname);
  },
});

export const uploadFile = multer({ storage });
