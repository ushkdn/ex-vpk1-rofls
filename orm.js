const { Sequelize } = require("sequelize")

const orm = new Sequelize(
    "db", 
    "user", 
    "password", 
    {
        host: "db",
        port: 5432,
        dialect: "postgres",
        logging: false,
        
    }
);

module.exports = orm;