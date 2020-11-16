import express from "express";
import cors from "cors";
import routes from "./routes";
import estadosRoutes from "./Estados/estados";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("Path - ", req.path);
  console.log("Data Execução - ", new Date());
  next();
});

app.use(routes);
app.use("/api/estados", estadosRoutes);

const port = 3333;

app.listen(port, () =>
  console.log(`#### Server is running on port:${port} ####`)
);
