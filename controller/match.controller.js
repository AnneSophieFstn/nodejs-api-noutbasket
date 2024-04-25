import Match from "../model/match.model.js";
import Terrain from "../model/terrain.model.js";

async function getAllMatch(req, res) {
  try {
    const matchs = await Match.findAll();

    const matchsWithTerrain = await Promise.all(
      matchs.map(async (match) => {
        const terrain = await Terrain.findByPk(match.terrain_id);
        return {
          ...match.toJSON(),
          terrain, // Ajoutez les détails du terrain au match
        };
      })
    );

    return res.status(200).json(matchsWithTerrain);
  } catch (error) {
    return res.status(500).json(
      console.log(error) /* {
      message: "Une erreur est survenue lors de la récupération du match",
    } */
    );
  }
}
async function getMatchByIdUser(req, res) {
  try {
    const getMatchByIdUser = await Match.findAll({
      where: { user_id: req.params.userId },
    });

    const matchsByUserIdWithTerrain = await Promise.all(
      getMatchByIdUser.map(async (matchsByUserId) => {
        const terrain = await Terrain.findByPk(matchsByUserId.terrain_id);
        return {
          ...matchsByUserId.toJSON(),
          terrain, // Ajoutez les détails du terrain au match
        };
      })
    );

    return res.status(200).json(matchsByUserIdWithTerrain);
  } catch (error) {
    console.log(error);
  }
}
async function getOneMatch(req, res) {
  try {
    const match = await Match.findByPk(req.params.id);

    if (!match) {
      return res.status(404).json({ message: "Ce match n'existe pas" });
    }

    return res.status(200).json(match);
  } catch (error) {
    return res.status(500).json({
      message: "Une erreur est survenue lors de la récupération du match",
    });
  }
}

async function getMatchByTerrain(req, res) {
  try {
    const matchByTerrain = await Match.findAll({
      where: {
        terrain_id: req.params.terrain_id,
      },
    });

    if (!matchByTerrain.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun match trouver pour ce terrain." });
    }

    return res.status(200).json(matchByTerrain);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

async function createMatch(req, res) {
  try {
    // On vérifie si toutes les données requises sont fournies dans la requête
    if (
      !req.body.name ||
      !req.body.date ||
      !req.body.heure ||
      !req.body.nbrParticipants ||
      !req.body.type ||
      !req.body.description ||
      !req.body.terrain_id ||
      !req.body.user_id
    ) {
      // Si certaines données sont manquantes, renvoie une réponse avec un statut 400 et un message d'erreur
      return res
        .status(400)
        .json({ message: "Merci de renseigner l'ensemble des informations" });
    }

    // Crée un nouveau match en utilisant les données fournies dans la requête
    const createMatch = Match.create({
      name: req.body.name,
      date: req.body.date,
      heure: req.body.heure,
      nbrParticipants: req.body.nbrParticipants,
      type: req.body.type,
      description: req.body.description,
      terrain_id: req.body.terrain_id,
      user_id: req.body.user_id,
    });

    // Renvoie une réponse avec un statut 200 et un message
    return res.status(200).json({
      message: "Match ajouté avec succès",
    });
  } catch (error) {
    // En cas d'erreur, renvoie une réponse avec un statut 500 et un message d'erreur générique
    return res.status(500).json({
      message: "Une erreur est survenue lors de la récupération du match",
    });
  }
}
async function updateMatch(req, res) {
  try {
    if (
      !req.body.name ||
      !req.body.date ||
      !req.body.heure ||
      !req.body.nbrParticipants ||
      !req.body.type ||
      !req.body.description ||
      !req.body.terrain_id ||
      !req.body.user_id
    ) {
      return res
        .status(400)
        .json({ message: "Merci de renseigner l'ensemble des informations" });
    }

    const updateMatch = Match.update(
      {
        name: req.body.name,
        date: req.body.date,
        heure: req.body.heure,
        nbrParticipants: req.body.nbrParticipants,
        type: req.body.type,
        description: req.body.description,
        terrain_id: req.body.terrain_id,
        user_id: req.body.user_id,
      },
      { where: { id: req.params.id } }
    );
    if (!updateMatch) {
      res.status(400).json({ message: "Ce match n'existe pas" });
    }

    return res.status(200).json({
      message: "Le match a bien été mis à jour..",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Une erreur est survenue lors de la récupération du match",
    });
  }
}

async function participants(req, res) {
  try {
    const match = await Match.findByPk(req.params.id);

    if (!match) {
      return res.status(404).json({ message: "Match introuvable" });
    }

    const currentInscrits = match.nbrInscrits;

    const incrementInscrit = await Match.update(
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

async function desinscrire(req, res) {
  try {
    const match = await Match.findByPk(req.params.id);

    if (!match) {
      return res.status(404).json({ message: "Match introuvable" });
    }

    const currentInscrits = match.nbrInscrits;

    const decrementInscrit = await Match.update(
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

async function deleteMatch(req, res) {
  try {
    const deleteMatch = await Match.destroy({
      where: { id: req.params.id },
    });

    if (!deleteMatch) {
      res.status(400).json({ message: "Ce match n'existe pas" });
    }

    return res.status(200).json({ message: "Le match à bien été supprimé" });
  } catch (error) {
    return res.status(500).json({
      message: "Une erreur est survenue lors de la récupération du match",
    });
  }
}

export {
  getAllMatch,
  getOneMatch,
  getMatchByIdUser,
  getMatchByTerrain,
  participants,
  desinscrire,
  createMatch,
  updateMatch,
  deleteMatch,
};
