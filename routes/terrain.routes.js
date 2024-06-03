import {
  getAllTerrain,
  getTerrainByIdUser,
  getOneTerrain,
  createTerrain,
  updateTerrain,
  deleteTerrain,
} from "../controller/terrain.controller.js";
import express from "express";
import multer from "multer";
import { verifyToken } from "../middleware/authentification.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/terrains/"); // Spécifiez le répertoire où les fichiers seront stockés sur le serveur
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Définissez le nom du fichier (dans cet exemple, la date et le nom d'origine)
  },
});

const upload = multer({ storage: storage });

const TerrainRoutes = express.Router();

TerrainRoutes.get("/terrains", getAllTerrain);
TerrainRoutes.get("/terrains/:idUser", getTerrainByIdUser);
TerrainRoutes.get("/terrains/:id", getOneTerrain);
TerrainRoutes.post(
  "/terrains",
  upload.single("image"),
  verifyToken,
  createTerrain
);
TerrainRoutes.put(
  "/terrains/:id",
  upload.single("image"),
  verifyToken,
  updateTerrain
);
TerrainRoutes.delete("/terrains/:id", verifyToken, deleteTerrain);

export default TerrainRoutes;
