import express from "express";
import { signIn } from "../middleware/authentification.js";

const AuthRoutes = express.Router();

AuthRoutes.post("/connexion", signIn);

export default AuthRoutes;
