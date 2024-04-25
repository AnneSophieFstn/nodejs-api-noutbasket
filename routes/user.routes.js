import express from "express";
import {
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  updateImgUser,
  updatePassword,
  deleteUser,
} from "../controller/user.controller.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/users/"); // Spécifiez le répertoire où les fichiers seront stockés sur le serveur
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Définissez le nom du fichier (dans cet exemple, la date et le nom d'origine)
  },
});

const upload = multer({ storage: storage });
const UserRoutes = express.Router();

UserRoutes.get("/users", getAllUser);
UserRoutes.get("/users/:id", getOneUser);
UserRoutes.post("/users", createUser);
UserRoutes.put("/users/:id", updateUser);
UserRoutes.put("/users/:id/images", upload.single("image"), updateImgUser);
UserRoutes.put("/users/:id/password", updatePassword);
UserRoutes.delete("/users/:id", deleteUser);

export default UserRoutes;
