import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Evenement = sequelize.define("Evenements", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Le nom ne peut pas être vide.",
      },
    },
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "La date ne peut pas être vide.",
      },
    },
  },
  heure: {
    type: DataTypes.TIME,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "L'heure ne peut pas être vide.",
      },
    },
  },
  payant: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Vous devez renseigner si c'est payant ou pas.",
      },
    },
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Le type d'evenement ne peut pas être vide.",
      },
    },
  },
  nbrPlaces: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Le nombre de place ne peut pas être vide.",
      },
    },
  },
  nbrInscrits: {
    type: DataTypes.INTEGER,
    defaultValue: "0",
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "La description ne peut pas être vide.",
      },
    },
  },
  terrain_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Evenement;
