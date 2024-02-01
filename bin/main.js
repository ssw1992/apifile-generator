#! /usr/bin/env node
import { Command } from "commander";

import load from "../lib/load.js";
import parser from "../lib/parser.js";
import generate from "../lib/generate.js";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { readFile } from "../lib/file.js";
const program = new Command();

program
  .description("解析swagger json 信息生成 api")
  .requiredOption("-u, --url <http|string>", "获取 swagger.json 的 url")
  .option("-o, --outPath <string>", "api 生成路径", "./src/api")
  .option("-t, --templatePath <string>", "使用指定的 swagger 模板路径")
  .action(async ({ url, outPath, templatePath }) => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const swaggerJson = await load(url);
    const apiGroups = await parser(swaggerJson);
    if (templatePath) {
      console.log("使用自定义模板，模板路径：", templatePath);
    }
    templatePath = templatePath || path.resolve(__dirname, "../api.hbs");

    const templateData = await readFile(templatePath);

    outPath = outPath.endsWith("/") ? outPath : outPath + "/";
    if (!fs.existsSync(outPath)) {
      fs.mkdirSync(outPath, { recursive: true });
    }
    await Promise.all(
      apiGroups.map((params) =>
        generate({
          templateData,
          outPath,
          params,
        })
      )
    );
    console.log("end");
  });

program.parse();
