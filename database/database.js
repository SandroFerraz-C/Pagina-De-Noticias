const Sequelize = require("sequelize");

const connection = new Sequelize("paginadenoticias", "root", "", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection;