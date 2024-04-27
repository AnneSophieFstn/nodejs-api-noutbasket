import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const InscritM = sequelize.define(
  "inscritsmatchs",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    match_id: {
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
export default InscritM;
