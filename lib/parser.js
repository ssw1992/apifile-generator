const METHOD_GET = "get";

function toCamelCase(str) {
  const parts = str.split("-");
  let result = "";
  for (let i = 0; i < parts.length; i++) {
    result += parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
  }
  return result.charAt(0).toLowerCase() + result.slice(1);
}

export default async function (data) {
  const apiGroups = Object.keys(data.paths).reduce((r, apiPath) => {
    const methods = data.paths[apiPath];
    Object.keys(methods).forEach((method) => {
      const swaggerApiInfo = methods[method];
      const group = swaggerApiInfo.tags[0];
      if (!r[group]) {
        r[group] = [];
      }

      const paramName = method === METHOD_GET ? "params" : "data";
      apiPath = (data.basePath || "") + apiPath;
      if (apiPath.includes("{") && apiPath.includes("}")) {
        apiPath = apiPath.replace("{", "${" + paramName + ".");
      }

      r[group].push({
        method,
        path: apiPath,
        desc: swaggerApiInfo.summary,
        operationId: toCamelCase(swaggerApiInfo.operationId),
        paramName,
      });
    });

    return r;
  }, {});

  return (data.tags || []).map((tag) => {
    // console.log('tag.name',apiGroups[tag.name])
    return { ...tag, apis: apiGroups[tag.name] };
  });
}
