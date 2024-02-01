const METHOD_GET = "get";
export default async function (data) {
  const apiGroups = Object.keys(data.paths).reduce((r, path) => {
    const methods = data.paths[path];
    Object.keys(methods).forEach((method) => {
      const swaggerApiInfo = methods[method];
      const group = swaggerApiInfo.tags[0];

      if (!r[group]) {
        r[group] = [];
      }

      r[group].push({
        method,
        path: data.basePath + path,
        desc: swaggerApiInfo.summary,
        operationId: swaggerApiInfo.operationId,
        paramName: method === METHOD_GET ? "params" : "data",
      });
    });

    return r;
  }, {});

  return (data.tags || []).map((tag) => {
    // console.log('tag.name',apiGroups[tag.name])
    return { ...tag, apis: apiGroups[tag.name] };
  });
}
