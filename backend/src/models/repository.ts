import { DataTypes } from "sequelize";
import { sequelize } from "../database";

export const Repository = sequelize.define("Repository", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owner: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stars: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});
