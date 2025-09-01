const { Sequelize } = require("sequelize")

const orm = new Sequelize(
    "db", 
    "user", 
    "password", 
    {
        host: "localhost",
        port: 5435,
        dialect: "postgres",
        logging: false,
        
    }
);

module.exports = orm;