import dotenv from "dotenv";
dotenv.config();
import express from "express";
import axios from "axios";

const routes = express.Router();

const URL = process.env.APP_URL;

function total(total, num) {
  return total + num;
}

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

routes.get("/grades", async (req, res) => {
  const grades = await axios.get(`${URL}/grades`).then(response => {
    return response.data;
  });
  return res.json({ grades });
});

routes.get("/grades/:id", async (req, res) => {
  const { id } = req.params;
  const grades = await axios.get(`${URL}/grades/${id}`).then(response => {
    return response.data;
  });
  return res.json({ grades });
});

routes.get("/nota-total-subject", async (req, res) => {
  const { student, subject } = req.query;

  const grades = await axios
    .get(`${URL}/grades?student=${student}&subject=${subject}`)
    .then(response => {
      return response.data;
    });

  const notaTotal = grades
    .map(grad => {
      return grad.value;
    })
    .reduce(total);

  return res.json({ notaTotal, grades });
});

routes.get("/media-total-subject", async (req, res) => {
  const { subject, type } = req.query;

  const grades = await axios
    .get(`${URL}/grades?type=${type}&subject=${subject}`)
    .then(response => {
      return response.data;
    });

  const notaTotal = grades
    .map(grad => {
      return grad.value;
    })
    .reduce(total);

  return res.json({ media: notaTotal / grades.length, notaTotal, grades });
});

routes.get("/maiores-notas-subject", async (req, res) => {
  const { subject, type } = req.query;

  const grades = await axios
    .get(`${URL}/grades?type=${type}&subject=${subject}`)
    .then(response => {
      return response.data;
    });

  const gradesFilter = grades
    .sort(compareValues("value", "desc"))
    .filter((i, index) => index < 3);

  return res.json(gradesFilter);
});

routes.post("/grades", async (req, res) => {
  const { student, subject, type, value, timestamp = new Date() } = req.body;

  const grade = await axios
    .post(`${URL}/grades`, {
      student,
      subject,
      type,
      value,
      timestamp
    })
    .then(response => {
      return response.data;
    });

  return res.json({ grade });
});

routes.put("/grades/:id", async (req, res) => {
  const { id } = req.params;

  const { student, subject, type, value, timestamp = new Date() } = req.body;

  // await axios
  //   .get(`${URL}/grades/${id}`)
  //   .then(response => {
  //     return response.data;
  //   })
  //   .catch(err => {
  //     console.log("Error - Grade não encontrada...");
  //     return res.status(404).json({ message: "Grade não encontrada...." });
  //   });

  const newGrade = await axios
    .put(`${URL}/grades/${id}`, {
      id,
      student,
      subject,
      type,
      value,
      timestamp
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return res.status(404).json({
        message: "Grade não encontrada!!!"
      });
    });

  return res.json({ newGrade });
});

routes.delete("/grades/:id", async (req, res) => {
  const { id } = req.params;

  await axios.delete(`${URL}/grades/${id}`).then(response => {
    return response.data;
  });

  return res.status(200).json({ message: "A grade foi excluída com sucesso." });
});

export default routes;
