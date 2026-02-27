import { DataTypes } from "sequelize";

export default (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
      },

      password: {
        type: DataTypes.STRING, // ✅ THIS LINE FIXES YOUR ERROR
        allowNull: false,
      },

      role: {
        type: DataTypes.STRING(20),
        defaultValue: "user",
      },
    },
    {
      tableName: "users",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    }
  );

  return User;
};
