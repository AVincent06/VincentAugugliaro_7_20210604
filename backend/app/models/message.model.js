module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("Message", {
        id_messages: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        picture: {
            type: Sequelize.STRING
        },
        article: {
            type: Sequelize.TEXT
        }
    });
    return Message;
};