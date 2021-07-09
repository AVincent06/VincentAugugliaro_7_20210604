module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("Category", {
        id_categories: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING(7),
            allowNull: false,
            unique: true
        }
    });
    return Category;
};