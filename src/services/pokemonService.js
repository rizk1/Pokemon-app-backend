require('dotenv').config()
// Load model
const {
    PokemonCaught
} = require('../models/BaseModel')
const sequelize = require('../../db')
const { Sequelize } = require('sequelize');

module.exports.detailPokemonCaught = async (req, res, next, pokeName) => {
    const pokemon = await PokemonCaught.findOne({
        where: {
            pokemon: pokeName
        }
    })
    return pokemon
}

module.exports.listPokemonCaught = async (req, res, next) => {
    const limit = req.query.limit;
    const offset = req.query.offset * limit - limit;
    const search_val = req.query.search_val;
    let wherearr = []
    let whereQuery = ''
    if (search_val) {
        wherearr.push(`LIKE LOWER('%${search_val}%')`)
    }
    if (wherearr.length > 0) {
        whereQuery = 'WHERE ' + wherearr.join(' AND ')
    }
    const query = `SELECT a.* FROM pokemon_caught a ${whereQuery}`
    const pokemon = await sequelize.query(`${query} LIMIT ${limit} OFFSET ${offset}`, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
    })
    const total = await sequelize.query(query, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
    })
    return {
        pokemon: pokemon,
        totalPages: Math.ceil(total.length / limit)
    };
}