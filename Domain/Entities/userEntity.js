const { DataTypes } = require("sequelize");

const sequelize = require("../../infrastructure/persistence/orm")

const userEntity = sequelize.define(
    "users", 
    {
        id:
        {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        username: 
        {   
            type: DataTypes.STRING, 
            unique: true, 
            allowNull: false
        },
        password:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        
    }
);

module.exports = userEntity;