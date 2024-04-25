import express from "express";
import MatchRoutes from "../routes/match.routes.js";
import UserRoutes from "../routes/user.routes.js";
import AuthRoutes from "../routes/auth.routes.js";
import EvenementRoutes from "../routes/evenement.routes.js";
import TerrainRoutes from "../routes/terrain.routes.js";
import InscritRoutes from "../routes/inscrit.routes.js";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.DB_PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesDirectory = path.resolve(__dirname, "../images");

app.use("/images", express.static(imagesDirectory));
app.use(AuthRoutes);
app.use(UserRoutes);
app.use(InscritRoutes);
app.use(MatchRoutes);
app.use(EvenementRoutes);
app.use(TerrainRoutes);
/*  */
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
