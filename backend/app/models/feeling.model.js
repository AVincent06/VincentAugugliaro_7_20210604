module.exports = (sequelize, Sequelize) => {
    const Feeling = sequelize.define("Feeling", {
        id_feelings: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        }
    });
    return Feeling;
};