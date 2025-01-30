import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Course = sequelize.define("Course", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  course_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  credits: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Course;
