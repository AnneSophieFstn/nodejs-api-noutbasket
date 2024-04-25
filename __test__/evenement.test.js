import { createEvenement } from "../controller/evenement.controller.js";
import Evenement from "../model/evenement.model.js";

jest.mock("../model/evenement.model.js");

describe("Test de la fonction createEvenement", () => {
  const req = {
    body: {
      name: "Evenement de test",
      date: "2024-04-17",
      heure: "14:00",
      payant: "non",
      nbrPlaces: 10,
      type: "3v3",
      description: "Evenement de la mort",
      terrain_id: "7",
      user_id: "1",
    },
  };

  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  test("Retourne un message de succès pour la création de l'evenement", async () => {
    Evenement.create.mockResolvedValueOnce();

    await createEvenement(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Evenement ajouté avec succès",
    });
  });

  test("Retourne un message d'erreur si les informations sont manquantes", async () => {
    const incompleteReq = { ...req };
    delete incompleteReq.body.name; // Supprime une donnée requise de la requête

    await createEvenement(incompleteReq, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Merci de renseigner l'ensemble des informations",
    });
  });
});
