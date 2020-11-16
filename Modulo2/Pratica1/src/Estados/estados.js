import express from "express";
import path from "path";
import fs from "fs";

import estados from "../repositories/estados.json";
import cities from "../repositories/cidades.json";
const estadosRoutes = express.Router();

function compareValues(key, order = "asc") {
  return function inner(a, b) {
    let comp = 0;
    const varA = a[key];
    const varB = b[key];

    if (varA > varB) {
      comp = 1;
    } else if (varA < varB) {
      comp = -1;
    }

    return order === "desc" ? comp * -1 : comp;
  };
}

estadosRoutes.get("", (req, res) => {
  const data = estados.map(est => {
    const result = {
      ...est,
      cidades: cities.filter(c => c.estadoId === est.id)
    };
    return result;
  });

  data.map(e => {
    const filePath = path.resolve(
      __dirname,
      "..",
      "repositories",
      "estados",
      `${e.uf}.json`
    );
    fs.unlink(filePath, err => {
      if (err) return console.log(err);
    });
    fs.appendFile(filePath, JSON.stringify(e, null, 4), function(err) {
      if (err) return console.log(err);
      //   console.log("Arquivo criado com sucesso!!!");
    });
  });

  const estadosFilterMaior = data
    .map(e => {
      // const filePath = path.resolve(
      //   __dirname,
      //   "..",
      //   "repositories",
      //   "estados",
      //   `${e.uf}.json`
      // );
      // fs.readFile(filePath, "utf8", (err, dt) => {
      //   if (err) return console.log(err);
      //   const rawData = JSON.parse(dt);
      //   console.log({ uf: e.uf, qtsCidades: rawData.cidades.length });
      // });
      console.log("Questão 2: ", { uf: e.uf, qtsCidades: e.cidades.length });
      return { uf: e.uf, qtdCidades: e.cidades.length };
    })
    .sort(compareValues("qtdCidades", "desc"))
    .filter((i, index) => index < 5);

  const estadosFilterMenor = data
    .map(e => {
      return { uf: e.uf, qtdCidades: e.cidades.length };
    })
    .sort(compareValues("qtdCidades", "asc"))
    .filter((i, index) => index < 5);

  console.log("Questão 3:", estadosFilterMenor);
  console.log("Questão 4:", estadosFilterMaior);

  return res.json(data);
});

export default estadosRoutes;
