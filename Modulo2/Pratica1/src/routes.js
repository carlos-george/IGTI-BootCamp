import express from "express";
import axios from "axios";
const router = express.Router();

// router.get("/", (req, res) => {
//   return res.json({ message: "Server is running..." });
// });

function compareValues(key, order = "asc") {
  return function inner(a, b) {
    let comp = 0;
    const varA = typeof a[key] === "string" ? a[key].length : a[key];
    const varB = typeof b[key] === "string" ? b[key].length : b[key];

    if (varA > varB) {
      comp = 1;
    } else if (varA < varB) {
      comp = -1;
    }

    return order === "desc" ? comp * -1 : comp;
  };
}

router.get("/estados", (req, res) => {
  axios.get("http://localhost:3000/estados?_embed=cidades").then(response => {
    return res.json(response.data);
  });
});

router.get("/estados-maior-cidades", (req, res) => {
  axios.get("http://localhost:3000/estados?_embed=cidades").then(response => {
    const estados = response.data.map(result => {
      return { uf: result.uf, qtdCidades: result.cidades.length };
    });

    const estadosSort = estados.sort(compareValues("qtdCidades"));

    const estadosFilter = estadosSort.filter((i, index) => {
      return index < 5;
    });

    return res.json(estadosFilter);
  });
});

router.get("/estados-menor-cidades", (req, res) => {
  axios.get("http://localhost:3000/estados?_embed=cidades").then(response => {
    const estados = response.data.map(result => {
      return { uf: result.uf, qtdCidades: result.cidades.length };
    });

    const estadosSort = estados.sort(compareValues("qtdCidades", "desc"));

    const estadosFilter = estadosSort.filter((i, index) => {
      return index < 5;
    });

    return res.json(estadosFilter);
  });
});

router.get("/estados/:uf", async (req, res) => {
  const { uf } = req.params;
  await axios
    .get(`http://localhost:3000/estados?_embed=cidades&uf=${uf}`)
    .then(response => {
      const { id, nome, uf, cidades } = response.data[0];
      return res.json({
        id,
        nome,
        uf,
        qtdCidades: cidades.length,
        cidades
      });
    });
});

router.get("/estados/:uf/cidades-maior", async (req, res) => {
  const { uf } = req.params;
  await axios
    .get(`http://localhost:3000/estados?_embed=cidades&uf=${uf}`)
    .then(response => {
      const cidadesNomes = response.data[0].cidades.map(result => {
        return result.nome;
      });
      const cidadesNomesSort = cidadesNomes.sort(function(a, b) {
        return b.length - a.length;
      });
      console.log(cidadesNomesSort);

      const cidadesNomesUfs = cidadesNomesSort.map(nome => {
        return `${nome} - ${uf}`;
      });

      return res.json(cidadesNomesUfs);
    });
});

router.get("/cidades-menor", async (req, res) => {
  const cidades = await axios
    .get(`http://localhost:3000/cidades`)
    .then(response => response.data);

  const cidadesSort = cidades.sort(compareValues("nome"));

  return res.json(cidadesSort);
});

router.get("/cidades-menor-uf", async (req, res) => {
  const estados = await axios
    .get(`http://localhost:3000/estados?_embed=cidades`)
    .then(response => response.data);

  const newEstados = estados.map(est => {
    const cidade = est.cidades
      .sort(compareValues("nome", "asc"))
      .filter((i, index) => index < 1);
    return { uf: est.uf, cidade };
  });

  return res.json(newEstados);
});

router.get("/cidades-maior-uf", async (req, res) => {
  const estados = await axios
    .get(`http://localhost:3000/estados?_embed=cidades`)
    .then(response => response.data);

  const newEstados = estados.map(est => {
    const cidade = est.cidades
      .sort(compareValues("nome", "desc"))
      .filter((i, index) => index < 1);
    return { uf: est.uf, cidade };
  });

  return res.json(newEstados);
});

router.get("/cidades-maior", async (req, res) => {
  const cidades = await axios
    .get(`http://localhost:3000/cidades`)
    .then(response => response.data);

  const cidadesSort = cidades.sort(compareValues("nome", "desc"));

  return res.json(cidadesSort);
});

router.get("/estados/:uf/cidades-menor", async (req, res) => {
  const { uf } = req.params;
  await axios
    .get(`http://localhost:3000/estados?_embed=cidades&uf=${uf}`)
    .then(response => {
      const cidadesNomes = response.data[0].cidades.map(result => {
        return result.nome;
      });
      const cidadesNomesSort = cidadesNomes.sort(function(a, b) {
        return a.length - b.length;
      });

      const cidadesNomesUfs = cidadesNomesSort.map(nome => {
        return `${nome} - ${uf}`;
      });

      return res.json(cidadesNomesUfs);
    });
});

export default router;
