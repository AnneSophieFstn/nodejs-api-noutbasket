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

InscritRoutes.post("/inscrit/matchs", inscriptionMatch);
InscritRoutes.post("/inscrit/evenements", inscriptionEvenement);

InscritRoutes.delete("/inscrit/matchs/:id", deleteInscritMatch);
InscritRoutes.delete("/inscrit/evenements/:id", deleteInscritEvenement);

export default InscritRoutes;
