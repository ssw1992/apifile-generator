import fs from "fs";
export const readFile = async (path, options = "utf8") => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, options, function (err, data) {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};
