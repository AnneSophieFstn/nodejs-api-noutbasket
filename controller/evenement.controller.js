import Evenement from "../model/evenement.model.js";
import Terrain from "../model/terrain.model.js";

async function getAllEvenement(req, res) {
  try {
    const evenements = await Evenement.findAll();

    const evenementsWithTerrain = await Promise.all(
      evenements.map(async (evenement) => {
        const terrain = await Terrain.findByPk(evenement.terrain_id);
        return {
          ...evenement.toJSON(),
          terrain, // Ajouter les détails du terrain au match
        };
      })
    );

    return res.status(200).json(evenementsWithTerrain);
  } catch (error) {
    return res.status(500).json({ messages: error });
  }
}
async function getEvenementByIdUser(req, res) {
  try {
    const getEvenementByIdUser = await Evenement.findAll({
      where: { user_id: req.params.idUser },
    });

    const evenementsByUserIdWithTerrain = await Promise.all(
      getEvenementByIdUser.map(async (evenementByIdUser) => {
        const terrain = await Terrain.findByPk(evenementByIdUser.terrain_id);
        return {
          ...evenementByIdUser.toJSON(),
          terrain, // Ajouter les détails du terrain au match
        };
      })
    );
    return res.status(200).json(evenementsByUserIdWithTerrain);
  } catch (error) {
    console.log(error);
  }
}
async function getOneEvenement(req, res) {
  try {
    const evenement = await Evenement.findByPk(req.params.id);

    if (!evenement) {
      return res.status(404).json({ message: "Cet evenement n'existe pas" });
    }
    return res.status(200).json(evenement);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

async function getEvenementByTerrain(req, res) {
  try {
    const evenementByTerrain = await Evenement.findAll({
      where: {
        terrain_id: req.params.terrain_id,
      },
    });

    if (!evenementByTerrain.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun evenement trouver pour ce terrain." });
    }

    return res.status(200).json(evenementByTerrain);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

async function createEvenement(req, res) {
  try {
    if (
      !req.body.name ||
      !req.body.date ||
      !req.body.heure ||
      !req.body.nbrPlaces ||
      !req.body.payant ||
      !req.body.type ||
      !req.body.description ||
      !req.body.terrain_id ||
      !req.body.user_id
    ) {
      return res
        .status(400)
        .json({ message: "Merci de renseigner l'ensemble des informations" });
    }

    const createEvenement = await Evenement.create({
      name: req.body.name,
      date: req.body.date,
      heure: req.body.heure,
      nbrPlaces: req.body.nbrPlaces,
      payant: req.body.payant,
      type: req.body.type,
      description: req.body.description,
      terrain_id: req.body.terrain_id,
      user_id: req.body.user_id,
    });

    return res.status(200).json({
      message: "Evenement ajouté avec succès",
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

async function updateEvenement(req, res) {
  try {
    if (
      !req.body.name ||
      !req.body.date ||
      !req.body.heure ||
      !req.body.nbrPlaces ||
      !req.body.payant ||
      !req.body.type ||
      !req.body.description ||
      !req.body.terrain_id ||
      !req.body.user_id
    ) {
      return res
        .status(400)
        .json({ message: "Merci de renseigner l'ensemble des informations" });
    }

    const updateEvenement = await Evenement.update(
      {
        name: req.body.name,
        date: req.body.date,
        heure: req.body.heure,
        nbrPlaces: req.body.nbrPlaces,
        payant: req.body.payant,
        type: req.body.type,
        description: req.body.description,
        terrain_id: req.body.terrain_id,
        user_id: req.body.user_id,
      },
      { where: { id: req.params.id } }
    );

    if (!updateEvenement) {
      res.status(400).json({ message: "Cet evenement n'existe pas" });
    }

    return res.status(200).json({
      message: "Evenement modifié avec succès",
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

async function deleteEvenement(req, res) {
  try {
    const deleteEvenement = await Evenement.destroy({
      where: { id: req.params.id },
    });

    if (!deleteEvenement) {
      res.status(400).json({ message: "Cet evenement n'existe pas" });
    }

    return res.status(200).json({ message: "L'evenement à bien été supprimé" });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

async function participantsE(req, res) {
  console.log(req.body);
  console.log(req.query);
  try {
    const evenement = await Evenement.findByPk(req.params.id);

    if (!evenement) {
      return res.status(404).json({ message: "Evenement introuvable" });
    }

    const currentInscrits = evenement.nbrInscrits;

    const incrementInscrit = await Evenement.update(
      {
        nbrInscrits: currentInscrits + 1,
      },
      { where: { id: req.params.id } }
    );
    return res.status(200).json({
      message: "L'utilisateur a bien été inscrit..",
    });
  } catch (error) {
    console.log(error);
  }
}

async function desinscrireE(req, res) {
  try {
    const evenement = await Evenement.findByPk(req.params.id);

    if (!evenement) {
      return res.status(404).json({ message: "Evenement introuvable" });
    }

    const currentInscrits = evenement.nbrInscrits;

    const decrementInscrit = await Evenement.update(
      {
        nbrInscrits: currentInscrits - 1,
      },
      { where: { id: req.params.id } }
    );
    return res.status(200).json({
      message: "L'utilisateur a bien été inscrit..",
    });
  } catch (error) {
    console.log(error);
  }
}

export {
  getAllEvenement,
  getOneEvenement,
  getEvenementByIdUser,
  getEvenementByTerrain,
  participantsE,
  desinscrireE,
  createEvenement,
  updateEvenement,
  deleteEvenement,
};
