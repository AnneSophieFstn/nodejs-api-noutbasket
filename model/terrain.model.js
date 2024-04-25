import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Terrain = sequelize.define("Terrains", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "L'image ne doit pas être vide.",
      },
    },
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
  adresse: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "L'adresse ne peut pas être vide.",
      },
    },
  },
  nbrTerrains: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Le nommbre de terrain ne peut pas être vide.",
      },
    },
  },
  nbrPaniers: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Le nombre de panier ne peut pas être vide.",
      },
    },
  },
  longitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Terrain;
