import { signIn } from "../middleware/authentification.js";
import UserModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../middleware/authentification.js");

describe("Test fonctionnalité SignIn", () => {
  const req = {
    body: {
      email: "test@test.com",
      password: "coucou",
    },
  };

  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    header: jest.fn(),
  };

  test("Utilisateur connecter avec succes, un token lui sera atttribué", async () => {
    const mockUser = {
      email: "test@test.com",
      password: "coucou",
    };
    UserModel.findOne.mockResolvedValueOnce(mockUser);
    bcrypt.compare.mockImplementationOnce(
      (password, hashedPassword, callback) => {
        callback(null, true);
      }
    );
    jwt.sign.mockResolvedValueOnce(
      "46561dfsSDF341FSD5SD5F5cv2bghjdr$%xcjghjmfLKHO56141634556GDFFG"
    );

    await signIn(req, res);

    expect(res.header).toHaveBeenCalledWith(
      "Authorization",
      "Bearer 46561dfsSDF341FSD5SD5F5cv2bghjdr$%xcjghjmfLKHO56141634556GDFFG"
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: "46561dfsSDF341FSD5SD5F5cv2bghjdr$%xcjghjmfLKHO56141634556GDFFG",
      user: mockUser,
      message: "Vous êtes bien connecté",
    });
  });
});
