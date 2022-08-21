const { getAllPlanet } = require('../../model/planetModel')


const httpGetAllPlanet =async (req, res) => {
    return res.status(200).json(await getAllPlanet())
}




module.exports = httpGetAllPlanet