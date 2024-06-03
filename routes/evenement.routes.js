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
import { verifyToken } from "../middleware/authentification.js";

const EvenementRoutes = express.Router();

EvenementRoutes.get("/evenements", getAllEvenement);
EvenementRoutes.get("/evenements/:idUser", getEvenementByIdUser);
EvenementRoutes.get("/evenements/:id", getOneEvenement);
EvenementRoutes.get("/evenements/terrain/:terrain_id", getEvenementByTerrain);
EvenementRoutes.post("/evenements", verifyToken, createEvenement);
EvenementRoutes.put("/evenements/:id", verifyToken, updateEvenement);
EvenementRoutes.delete("/evenements/:id", verifyToken, deleteEvenement);
EvenementRoutes.put("/evenements/participants/:id", verifyToken, participantsE);
EvenementRoutes.put("/evenements/desinscrire/:id", verifyToken, desinscrireE);

export default EvenementRoutes;
