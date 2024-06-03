import express from "express";
import {
  getAllInscritMatch,
  getAllInscritEvenement,
  getInscriptionMatchUserById,
  getInscriptionEvenementUserById,
  inscriptionMatch,
  inscriptionEvenement,
  deleteInscritMatch,
  deleteInscritEvenement,
} from "../controller/inscrit.controller.js";

import { verifyToken } from "../middleware/authentification.js";

const InscritRoutes = express.Router();

InscritRoutes.get("/inscrit/matchs", getAllInscritMatch);
InscritRoutes.get("/inscrit/evenements", getAllInscritEvenement);

InscritRoutes.get(
  "/inscrit/matchs/:matchId/:userId",
  getInscriptionMatchUserById
);
InscritRoutes.get(
  "/inscrit/evenements/:evenementId/:userId",
  getInscriptionEvenementUserById
);

InscritRoutes.post("/inscrit/matchs", verifyToken, inscriptionMatch);
InscritRoutes.post("/inscrit/evenements", verifyToken, inscriptionEvenement);

InscritRoutes.delete("/inscrit/matchs/:id", verifyToken, deleteInscritMatch);
InscritRoutes.delete(
  "/inscrit/evenements/:id",
  verifyToken,
  deleteInscritEvenement
);

export default InscritRoutes;
