import Terrain from "../model/terrain.model.js";

async function getAllTerrain(req, res) {
  try {
    const terrains = await Terrain.findAll();
    return res.status(200).json(terrains);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

async function getTerrainByIdUser(req, res) {
  try {
    const getTerrainByIdUser = await Terrain.findAll({
      where: { user_id: req.params.idUser },
    });
    return res.status(200).json(getTerrainByIdUser);
  } catch (error) {
    console.log(error);
  }
}
async function getOneTerrain(req, res) {
  try {
    const terrain = await Terrain.findByPk(req.params.id);

    if (!terrain) {
      return res.status(404).json({ message: "Ce terrain n'existe pas" });
    }
    return res.status(200).json(terrain);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

async function createTerrain(req, res) {
  try {
    // Vérifie si toutes les données requises sont fournies dans la requête
    if (
      !req.file ||
      !req.body.name ||
      !req.body.adresse ||
      !req.body.nbrTerrains ||
      !req.body.nbrPaniers ||
      !req.body.longitude ||
      !req.body.latitude ||
      !req.body.user_id
    ) {
      // Si des données sont manquantes, renvoie une réponse avec un statut 400 et un message d'erreur
      return res
        .status(400)
        .json({ message: "Merci de renseigner l'ensemble des informations" });
    }
    // Chemin du fichier téléchargé
    const filePath = req.file.path;
    // Corrige le chemin du fichier en remplaçant les antislashs par des slashs
    const correctedPath = filePath.replace(/\\/g, "/");

    // Crée un nouveau terrain en utilisant les données fournies dans la requête
    const createTerrain = await Terrain.create({
      image: correctedPath,
      name: req.body.name,
      adresse: req.body.adresse,
      nbrTerrains: req.body.nbrTerrains,
      nbrPaniers: req.body.nbrPaniers,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      user_id: req.body.user_id,
    });

    // Renvoie une réponse avec un statut 200 et un message
    return res.status(200).json({
      message: "Terrain ajouté avec succès",
    });
  } catch (error) {
    // En cas d'erreur, renvoie une réponse avec un statut 500 et un message d'erreur détaillé
    return res.status(500).json({
      message: error,
    });
  }
}
async function updateTerrain(req, res) {
  console.log(req.body);
  console.log(req.file);
  try {
    if (
      !req.body.name ||
      !req.body.adresse ||
      !req.body.nbrTerrains ||
      !req.body.nbrPaniers ||
      !req.body.longitude ||
      !req.body.latitude ||
      !req.body.user_id
    ) {
      return res
        .status(400)
        .json({ message: "Merci de renseigner l'ensemble des informations" });
    }

    let updateData = {
      name: req.body.name,
      adresse: req.body.adresse,
      nbrTerrains: req.body.nbrTerrains,
      nbrPaniers: req.body.nbrPaniers,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      user_id: req.body.user_id,
    };

    if (req.file) {
      const filePath = req.file.path; // Chemin du fichier téléchargé
      const correctedPath = filePath.replace(/\\/g, "/");
      updateData.image = correctedPath;
    }

    const updateTerrain = await Terrain.update(updateData, {
      where: { id: req.params.id },
    });

    if (!updateTerrain) {
      res.status(400).json({ message: "Ce terrain n'existe pas" });
    }

    return res.status(200).json({
      message: "Terrain modifié avec succès",
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}
async function deleteTerrain(req, res) {
  try {
    const deleteTerrain = await Terrain.destroy({
      where: { id: req.params.id },
    });

    if (!deleteTerrain) {
      res.status(400).json({ message: "Ce terrain n'existe pas" });
    }

    return res.status(200).json({ message: "Le terrain à bien été supprimé" });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

export {
  getAllTerrain,
  getTerrainByIdUser,
  getOneTerrain,
  createTerrain,
  updateTerrain,
  deleteTerrain,
};
