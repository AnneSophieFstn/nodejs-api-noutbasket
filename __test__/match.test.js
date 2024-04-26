import { createMatch } from "../controller/match.controller.js";
import Match from "../model/match.model.js";

jest.mock("../model/match.model.js");

describe("Test de la fonction createMatch", () => {
  const req = {
    body: {
      name: "Match de test",
      date: "2024-04-17",
      heure: "14:00",
      nbrParticipants: 10,
      type: "3v3",
      description: "Match amical en 3v3",
      terrain_id: "7",
      user_id: "1",
    },
  };

  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  test("Retourne un message de succès pour la création du match", async () => {
    Match.create.mockResolvedValueOnce();

    await createMatch(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Match ajouté avec succès",
    });
  });

  test("Retourne un message d'erreur si les informations sont manquantes", async () => {
    const incompleteReq = { ...req };
    delete incompleteReq.body.name; // Supprime une donnée requise de la requête

    await createMatch(incompleteReq, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Merci de renseigner l'ensemble des informations",
    });
  });
});
