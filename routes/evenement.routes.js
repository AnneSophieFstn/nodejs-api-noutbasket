import {
  getAllEvenement,
  getOneEvenement,
  getEvenementByIdUser,
  getEvenementByTerrain,
  participantsE,
  desinscrireE,
  createEvenement,
  updateEvenement,
  deleteEvenement,
} from "../controller/evenement.controller.js";

import express from "express";

const EvenementRoutes = express.Router();

EvenementRoutes.get("/evenements", getAllEvenement);
EvenementRoutes.get("/evenements/:idUser", getEvenementByIdUser);
EvenementRoutes.get("/evenements/:id", getOneEvenement);
EvenementRoutes.get("/evenements/terrain/:terrain_id", getEvenementByTerrain);
EvenementRoutes.post("/evenements", createEvenement);
EvenementRoutes.put("/evenements/:id", updateEvenement);
EvenementRoutes.delete("/evenements/:id", deleteEvenement);
EvenementRoutes.put("/evenements/participants/:id", participantsE);
EvenementRoutes.put("/evenements/desinscrire/:id", desinscrireE);

export default EvenementRoutes;
