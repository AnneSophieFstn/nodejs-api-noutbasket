import UserModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

async function signIn(req, res) {
  try {
    // Récupère l'email et le mot de passe de la requête
    const { email, password } = req.body;
    // Vérifie si l'email et le mot de passe sont fournis dans la requête
    if (!req.body.email || !req.body.password) {
      // Si des informations sont manquantes, renvoie une réponse avec un statut 400 et un message d'erreur
      return res
        .status(400)
        .json({ message: "Merci de renseigner l'ensemble des informations!" });
    }
    // Recherche l'utilisateur dans la base de données en utilisant l'email fourni
    const user = await UserModel.findOne({ where: { email: email } });
    if (user) {
      // Si l'utilisateur existe, compare le mot de passe fourni avec le mot de passe haché enregistré dans la base de données
      bcrypt.compare(password, user.password, function (err, response) {
        if (err) {
          // En cas d'erreur lors de la comparaison des mots de passe, lance une erreur
          throw new Error(err);
        }
        if (response) {
          // Si les mots de passe correspondent, génère un jeton d'authentification JWT
          const token = jwt.sign(
            {
              user: user,
            },
            SECRET_KEY,
            {
              expiresIn: process.env.JWT_EXPIRE,
            }
          );
          // Ajoute le jeton d'authentification dans l'en-tête de la réponse
          res.header("Authorization", "Bearer " + token);
          return res.status(200).json({
            token: token,
            user: user,
            message: "Vous êtes bien connecté",
          });
        }
        // Si les mots de passe ne correspondent pas, renvoie une réponse avec un statut 403 et un message d'erreur
        return res
          .status(403)
          .json({ message: "Email ou mot de passe incorrect" });
      });
    } else {
      // Si l'utilisateur n'existe pas, renvoie une réponse avec un statut 404 et un message d'erreur
      return res
        .status(404)
        .json({ message: "Email ou mot de passe incorrect" });
    }
  } catch (error) {
    // En cas d'erreur, renvoie une réponse avec un statut 500 et un message d'erreur générique
    return res
      .status(500)
      .json({ message: "Une erreur est survenue lors de l'authentification" });
  }
}

export { signIn };
