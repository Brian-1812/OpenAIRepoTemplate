import { v4 } from "uuid";
import * as fs from "fs";
import path from "path";
import { rimraf } from "rimraf";
import { IUser } from "common-types";
export const getUniqueId = () => v4();

export const deleteFiles = () => {
  var uploadsDir = __dirname + "/uploads";

  fs.readdir(uploadsDir, function (err, files) {
    files.forEach(function (file, index) {
      fs.stat(path.join(uploadsDir, file), function (err, stat) {
        var endTime, now;
        if (err) {
          return console.error(err);
        }
        now = new Date().getTime();
        endTime = new Date(stat.ctime).getTime() + 3600000;
        if (now > endTime) {
          return rimraf(path.join(uploadsDir, file));
        }
      });
    });
  });
};

export const getUserUploadsFolderPath = (userId: IUser["id"]) => {
  const directory = path.resolve(__dirname, "..", "uploads", userId.toString());
  return directory;
};
