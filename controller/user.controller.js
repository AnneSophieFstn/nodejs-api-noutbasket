import UserModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import Sequelize from "sequelize";

async function getAllUser(req, res) {
  try {
    const users = await UserModel.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération de l'utilisateur",
    });
  }
}

async function getOneUser(req, res) {
  try {
    const user = await UserModel.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Cet utilisateur n'existe pas" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération de l'utilisateur",
    });
  }
}

async function createUser(req, res) {
  try {
    const saltRounds = 10;

    const createUser = await UserModel.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, saltRounds),
    });

    return res.status(200).json({ message: "Utilisateur ajouté avec succès" });
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      console.log(error);
      const errors = error.errors.map((err) => err.message);

      errors.forEach((err) => {
        if (err.path === "username") {
          createUser.usernameError = err.message;
        } else if (err.path === "email") {
          createUser.emailError = err.message;
        } else if (err.path === "password") {
          createUser.passwordError = err.message;
        }
      });

      return res.status(422).json({ message: errors });
    } else {
      return res.status(500).json({
        message:
          "Une erreur est survenue lors de la récupération de l'utilisateur",
      });
    }
  }
}

async function updateImgUser(req, res) {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Merci de renseigner l'ensemble des informations" });
    }

    const filePath = req.file.path; // Chemin du fichier téléchargé
    const correctedPath = filePath.replace(/\\/g, "/");

    const updateImage = await UserModel.update(
      { avatar: correctedPath },
      { where: { id: req.params.id } }
    );
    if (!updateImage) {
      res.status(400).json({ message: "Cet utilisateur n'existe pas" });
    }

    return res.status(200).json({
      avatar: correctedPath,
      message: "Image modifié avec succès",
    });
  } catch (error) {
    console.log(error);
  }
}

async function updateUser(req, res) {
  try {
    if (!req.body.name || !req.body.username || !req.body.email) {
      return res
        .status(400)
        .json({ message: "Merci de renseigner l'ensemble des informations" });
    }

    const updateUser = await UserModel.update(
      {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        position: req.body.position,
        height: req.body.height,
        biography: req.body.biography,
      },
      { where: { id: req.params.id } }
    );
    if (!updateUser) {
      res.status(400).json({ message: "Cet utilisateur n'existe pas" });
    }

    return res.status(200).json({
      message: "L'utilisateur a bien été mis à jour..",
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération de l'utilisateur",
    });
  }
}

async function updatePassword(req, res) {
  const userId = req.params.id;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await UserModel.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifiez que l'ancien mot de passe correspond en utilisant bcrypt
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "L'ancien mot de passe est incorrect" });
    }

    // Cryptez le nouveau mot de passe avec bcrypt
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Mettez à jour le mot de passe dans la base de données
    user.password = hashedNewPassword;
    await user.save();

    return res
      .status(200)
      .json({ message: "Mot de passe mis à jour avec succès" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du mot de passe" });
  }
}

async function deleteUser(req, res) {
  try {
    const deleteUser = await UserModel.destroy({
      where: { id: req.params.id },
    });

    if (!deleteUser) {
      res.status(400).json({ message: "Cet utilisateur n'existe pas" });
    }

    return res
      .status(200)
      .json({ message: "L'utilisateur à bien été supprimé" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération de l'utilisateur",
    });
  }
}

export {
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  updatePassword,
  updateImgUser,
  deleteUser,
};
