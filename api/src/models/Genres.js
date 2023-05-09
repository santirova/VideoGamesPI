const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('genres', {
        id:{
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
};