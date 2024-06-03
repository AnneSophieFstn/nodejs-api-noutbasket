import express from "express";
import {
  getAllMatch,
  getOneMatch,
  getMatchByIdUser,
  getMatchByTerrain,
  createMatch,
  participants,
  desinscrire,
  updateMatch,
  deleteMatch,
} from "../controller/match.controller.js";
import { verifyToken } from "../middleware/authentification.js";

const MatchRoutes = express.Router();

MatchRoutes.get("/matchs", getAllMatch);
MatchRoutes.get("/matchs/test/:userId", getMatchByIdUser);
MatchRoutes.get("/matchs/:id", getOneMatch);
MatchRoutes.get("/matchs/terrain/:terrain_id", getMatchByTerrain);
MatchRoutes.post("/matchs", verifyToken, createMatch);
MatchRoutes.put("/matchs/:id", verifyToken, updateMatch);
MatchRoutes.put("/matchs/participants/:id", verifyToken, participants);
MatchRoutes.put("/matchs/desinscrire/:id", verifyToken, desinscrire);
MatchRoutes.delete("/matchs/:id", verifyToken, deleteMatch);

export default MatchRoutes;
