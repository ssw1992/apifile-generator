import fs from "fs";
import handlebars from "handlebars";

export default async function ({ templateData, outPath, params }) {
  return new Promise((resolve, reject) => {
    const template = handlebars.compile(templateData);
    const html = template(params);
    fs.writeFile(outPath + params.name + ".ts", html, function (err) {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      resolve();
    });
  });
}
