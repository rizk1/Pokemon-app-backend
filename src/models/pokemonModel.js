const { DataTypes } = require('sequelize');

module.exports.PokemonModel = (sequelize) => {
    return sequelize.define(
        'pokemon_caught',
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            pokemon: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            pokemon_name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            name_change: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0,
            },
        },
        {
            freezeTableName: true,
            timestamps: true,
        }
    );
};
