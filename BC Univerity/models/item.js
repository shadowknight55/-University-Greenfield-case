import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; // Import the sequelize instance

const Item = sequelize.define("Item", {
  item_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, // Default quantity to 0
  },
});

// Export the Item model
export default Item;
