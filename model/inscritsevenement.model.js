import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const InscritE = sequelize.define(
  "InscritsEvenements",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    evenement_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);
export default InscritE;
