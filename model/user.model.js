import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        args: true,
        msg: "Le pseudo ne peut pas être vide.",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        args: true,
        msg: "L'adresse email ne peut pas être vide.",
      },
      isEmail: {
        args: true,
        msg: "Veuillez entrer une adresse email valide.",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Le mot de passe ne peut pas être vide.",
      },
    },
  },
  position: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  height: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  biography: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default User;
