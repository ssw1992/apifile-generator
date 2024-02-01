
import fs from 'fs';
export const readFile = async (path, options = 'utf8') => {
  return new Promise((resolve, reject) => {
    fs.readFile("api.hbs", "utf8", function (err, data) {
      if (err) {
        reject(error)
        return;
      }
      resolve(data)
    });
  })
}