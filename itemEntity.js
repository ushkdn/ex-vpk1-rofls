const { DataTypes } = require("sequelize");
const Orm = require("./orm");
const userEntity = require("./userEntity");

const itemEntity = Orm.define(
    "items",
    {
        id:
        {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        name: 
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status:
        {
            type: DataTypes.ENUM("planned", "purchased", "missing"),
            defaultValue: "planned"
        },
        userId:
        {
            type: DataTypes.UUID,
            allowNull: false,
        }
    }
);

userEntity.hasMany(itemEntity, { foreignKey: "userId", onDelete: "CASCADE" });
itemEntity.belongsTo(userEntity, { foreignKey: "userId" });

module.exports = itemEntity;