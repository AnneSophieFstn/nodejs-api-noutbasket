import InscritM from "../model/inscritsmatch.model.js";
import InscritE from "../model/inscritsevenement.model.js";

async function getAllInscritMatch(req, res) {
  try {
    const getAllInscritMatch = await InscritM.findAll();
    return res.status(200).json(getAllInscritMatch);
  } catch (error) {
    return res.status(500).json(
      console.log(error) /* {
      message: "Une erreur est survenue lors de la récupération du match",
    } */
    );
  }
}
async function getAllInscritEvenement(req, res) {
  try {
    const getAllInscritEvenement = await InscritE.findAll();
    return res.status(200).json(getAllInscritEvenement);
  } catch (error) {
    return res.status(500).json(
      console.log(error) /* {
      message: "Une erreur est survenue lors de la récupération du match",
    } */
    );
  }
}

async function getInscriptionMatchUserById(req, res) {
  try {
    const inscriptionM = await InscritM.findOne({
      where: { match_id: req.params.matchId, user_id: req.params.userId },
    });

    if (inscriptionM) {
      // Si l'inscription existe, cela signifie que l'utilisateur est déjà inscrit
      return res.status(200).json({ inscriptionM, isInscrit: true });
    }

    return res.status(400).json({ message: "Cette inscription n'existe pas" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la vérification de l'inscription.",
    });
  }
}

async function getInscriptionEvenementUserById(req, res) {
  console.log(req.body);
  console.log(req.query);
  try {
    const inscriptionE = await InscritE.findOne({
      where: {
        evenement_id: req.params.evenementId,
        user_id: req.params.userId,
      },
    });

    if (inscriptionE) {
      // Si l'inscription existe, cela signifie que l'utilisateur est déjà inscrit
      return res.status(200).json({ inscriptionE, isInscrit: true });
    }

    return res.status(400).json({ message: "Cette inscription n'existe pas" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la vérification de l'inscription.",
    });
  }
}

async function inscriptionMatch(req, res) {
  try {
    const inscriptionMatch = await InscritM.create({
      user_id: req.body.user_id,
      match_id: req.body.match_id,
    });
    return res.status(200).json({
      message: "Inscription fait avec succès",
    });
  } catch (error) {
    return res.status(500).json(
      console.log(error) /* {
      message: "Une erreur est survenue lors de la récupération du match",
    } */
    );
  }
}

async function inscriptionEvenement(req, res) {
  try {
    const inscriptionEvenement = await InscritE.create({
      user_id: req.body.user_id,
      evenement_id: req.body.evenement_id,
    });
    return res.status(200).json({
      message: "Inscription fait avec succès",
    });
  } catch (error) {
    return res.status(500).json(
      console.log(error) /* {
      message: "Une erreur est survenue lors de la récupération du match",
    } */
    );
  }
}

async function deleteInscritMatch(req, res) {
  try {
    const deleteInscritMatch = await InscritM.destroy({
      where: { id: req.params.id },
    });

    if (!deleteInscritMatch) {
      res.status(400).json({ message: "Cette inscription n'existe pas" });
    }
    return res
      .status(200)
      .json({ message: "L'inscription' à bien été supprimé" });
  } catch (error) {
    return res.status(500).json(
      console.log(error) /* {
      message: "Une erreur est survenue lors de la récupération du match",
    } */
    );
  }
}
async function deleteInscritEvenement(req, res) {
  try {
    const deleteInscritEvenement = await InscritE.destroy({
      where: { id: req.params.id },
    });

    if (!deleteInscritEvenement) {
      res.status(400).json({ message: "Cette inscription n'existe pas" });
    }
    return res
      .status(200)
      .json({ message: "L'inscription' à bien été supprimé" });
  } catch (error) {
    return res.status(500).json(
      console.log(error) /* {
      message: "Une erreur est survenue lors de la récupération du match",
    } */
    );
  }
}

export {
  getAllInscritMatch,
  getAllInscritEvenement,
  getInscriptionEvenementUserById,
  getInscriptionMatchUserById,
  inscriptionMatch,
  inscriptionEvenement,
  deleteInscritMatch,
  deleteInscritEvenement,
};
