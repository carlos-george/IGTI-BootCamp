import { db } from "../models/index.js";
import { logger } from "../config/logger.js";

import Grades from "../models/grades";
import { grades } from "../grades";

const createMass = async (req, res) => {
  try {
    const gradesCreated = await Grades.create(grades);

    logger.info(`POST /grade - ${JSON.stringify(gradesCreated.length)}`);
    res
      .status(201)
      .json({ message: "Grade inserido com sucesso", gradesCreated });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Algum erro ocorreu ao salvar" });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const create = async (req, res) => {
  const { name, subject, type, value } = req.body;
  try {
    const grade = await Grades.create({ name, subject, type, value });

    logger.info(`POST /grade - ${JSON.stringify(grade)}`);
    res.status(201).json({ message: "Grade inserido com sucesso" });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Algum erro ocorreu ao salvar" });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const { name } = req.query;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  try {
    logger.info(`GET /grade`);

    const grades = await Grades.find(condition);

    return res.json(grades);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const grade = await Grades.findOne({ _id: id });

    logger.info(`GET /grade - ${id}`);

    res.status(200).json(grade);
  } catch (error) {
    res.status(500).send({ message: "Erro ao buscar o Grade id: " + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Dados para atualizacao vazio",
    });
  }

  const { id } = req.params;
  const { name, subject, type, value } = req.body;

  try {
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);

    const grade = await Grades.findByIdAndUpdate(
      { _id: id },
      { name, subject, type, value },
      { new: true }
    );

    res.status(200).json({ message: "Grade atualizada com sucesso", grade });
  } catch (error) {
    res.status(500).send({ message: "Erro ao atualizar a Grade id: " + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    logger.info(`DELETE /grade - ${id}`);

    await Grades.findOneAndDelete({ _id: id });

    res.status(200).json({ message: "Grade removida com sucesso" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Nao foi possivel deletar o Grade id: " + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    logger.info(`DELETE /grade`);

    await Grades.deleteMany();

    res.status(200).json({ message: "Grads removidas com sucesso" });
  } catch (error) {
    res.status(500).send({ message: "Erro ao excluir todos as Grades" });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default {
  createMass,
  create,
  findAll,
  findOne,
  update,
  remove,
  removeAll,
};
