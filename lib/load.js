import fetch from "node-fetch";
import fs from "fs";

export default async function (url) {
  if (url.startsWith("http")) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("can not get from" + url);
    }
    return res.json()
  } else {
    const jsonData = fs.readFileSync(url, "utf-8");
    return JSON.parse(jsonData);
  }
}
