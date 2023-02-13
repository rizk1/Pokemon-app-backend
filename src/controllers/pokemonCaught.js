const { PokemonCaught } = require('../models/baseModel');
const { listPokemonCaught, detailPokemonCaught } = require('../services/pokemonService');

module.exports.getPokemon = async (req, res, next) => {
    try {
        const pokemon = await PokemonCaught.findAll({
            order: [
                ['id', 'DESC']
            ]
        })
        return res.status(200).json({
            status: 'success',
            data: pokemon,
            message: "List Of Pokemon"
        })
    } catch (error) {
        return next(error);
    }
}

module.exports.getPokemonList = async (req, res, next) => {
    try {
        const pokemon = await listPokemonCaught(req, res, next)
        return res.status(200).json({
            status: 'success',
            data: pokemon,
            message: "List Of Pokemon"
        })
    } catch (error) {
        return next(error);
    }
}

module.exports.getDetailPokemon = async (req, res, next) => {
    try {
        const pokemon = await detailPokemonCaught(req, res, next, req.params.pokemon)
        return res.status(200).json({
            status: 'success',
            data: pokemon,
            message: "Detail Of Pokemon Catch"
        })
    } catch (error) {
        return next(error);
    }
}

module.exports.CatchPokemon = async (req, res, next) => {
    try {
        const checkPokemon = await detailPokemonCaught(req, res, next, req.body.pokemon)
    
        if (checkPokemon) {
            return res.status(200).json({
                status: 'failed',
                message: "Pokemon Already Catch"
            })
        }
    
        const Catching = async () => {
            const randomBool = Math.random() > 0.5 ? true : false;
            return randomBool
        }

        const possibility = await Catching()
        if (possibility) {
            const pokemon = await PokemonCaught.create({
                pokemon: req.body.pokemon,
            })
            return res.status(200).json({
                status: 'success',
                data: pokemon,
                message: "Catch Success"
            })
        }

        return res.status(200).json({
            status: 'failed',
            message: "Catch failed"
        })
    } catch (error) {
        return next(error)
    }
}

module.exports.UpdateNamePokemon = async (req, res, next) => {
    try {
        const checkPokemon = await detailPokemonCaught(req, res, next, req.body.pokemon)

        const fibonacci = (num) => {
            let a = 0, b = 1, temp;
            for (let i = 0; i < num; i++) {
              temp = a;
              a = b;
              b = temp + b;
            }
            return a;
          }

        if (checkPokemon) {
            const data = {
                pokemon_name: req.body.pokemon_name,
            }

            if (checkPokemon.name_change !== '' && checkPokemon.pokemon_name) {
                data.name_change = checkPokemon.name_change+1
                data.pokemon_name = `${req.body.pokemon_name} ${fibonacci(checkPokemon.name_change)}`
            }

            await PokemonCaught.update(data, {
                where: {
                    pokemon: req.body.pokemon
                }
            })
            return res.status(200).json({
                status: 'success',
                message: "Change name success"
            })
        }

        return res.status(200).json({
            status: 'failed',
            message: "Change name failed"
        })
    } catch (error) {
        return next(error)
    }
}

module.exports.ReleasePokemon = async (req, res, next) => {
    try {
        const checkPokemon = await detailPokemonCaught(req, res, next, req.query.pokemon)

        if (checkPokemon) {
            return res.status(200).json({
                status: 'success',
                number: Math.floor(Math.random() * 100),
                message: "Release Number For Pokemon"
            })
        }

        return res.status(404).json({
            status: 'failed',
            message: "Not Found"
        })
    } catch (error) {
        return next(error)
    }
}