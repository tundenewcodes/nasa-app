const { parse } = require('csv-parse')
const fs = require('fs')
const path = require('path')
const planets = require('./planetSchema')
const isHabitable = (planet) => {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  )
}

const loadPlanetData = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, '..', '..', 'data', 'data.csv')
    )
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', (data) => {
        if (isHabitable(data)) {
          savePlanet(data)
        }
      })
      .on('error', (error) => {
        console.log(error)
        reject(error)
      })
      .on('end', async() => {
        const countHabitablePlanets = (await getAllPlanet()).length
        console.log(`${countHabitablePlanets} habitable planets found`)
        resolve()
      })
  })
}

const savePlanet = async (planet) => {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      { keplerName: planet.kepler_name },
      { upsert: true }
    )
  } catch (error) {
    console.log(error)
  }
}
const getAllPlanet = async () => {

 return  await planets.find({},{'_id':0, '__v':0})


}
module.exports = { loadPlanetData, getAllPlanet }
