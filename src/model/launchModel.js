const launches = require('./launchesSchema')
const axios = require('axios')
const  planets  =  require('./planetSchema')


const flightLatestNumber = 100

const saveLaunch = async (launch) => {

  await launches.findOneAndUpdate(
    { flightNumber: launch.flightNumber },
    launch,
    { upsert: true }
  )
}




const  findLaunch  = async (launchId)=>{
return  await launches.findOne(launchId)
}



const exitsLaunchWithId = async (launchId) => {
  return await findLaunch({
    flightNumber: launchId,
  })
}

const getLatestFlightNumber = async () => {
  const latestLaunch = await launches.findOne().sort('-flightNumber')

  if (!latestLaunch) {
    return flightLatestNumber
  }

  return latestLaunch.flightNumber
}





const getAllLaunches = async (skip, limit) => {

  return await launches.find({}, { _id: 0, __v: 0 }).sort({flightNumber : 1}).skip(skip).limit(limit)
}




const addNewLaunch = async (launch) => {
  const planet = await planets.findOne({
    flightNumber: launch.target,
  })

  if (!planet) {
    throw new Error('no matching planet found')
  }
  const newFlightNumber = (await getLatestFlightNumber()) + 1

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ['zero to mastery', 'NASA'],
    flightNumber: newFlightNumber,
  })

  await saveLaunch(newLaunch)
}

const abortLaunchById = async (launchId) => {
  const aborted = await launches.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  )

  return aborted.modifiedCount === 1
}

const  populateLaunches = async() => {
  const response = await axios.post(SPACEX_URL, {
  query: {},
  options: {
    pagination: false,
    populate: [
      { path: 'rocket', select: { name: 1 } },
      { path: 'payloads', select: { customers: 1 } },
    ],
  },
  })
if(!response.ok ===200){
  console.log('problem downloading launch data')
  throw new Error ('launch data download failed')
}
const launchDocs = response.data.docs

for (const launchDoc of launchDocs) {
  const payloads = launchDoc['payloads']
  const customers = payloads.flatMap((payload) => {
    return payload['customers']
  })
  const launch = {
    flightNumber: launchDoc['flight_number'], //flight_number
    mission: launchDoc['name'], //name
    rocket: launchDoc['rocket']['name'], // rocket.name
    launchDate: launchDoc['date_local'], // date_local
    customers: customers, // payload.customers for each payload
    upcoming: launchDoc['upcoming'], // upcoming
    success: launchDoc['success'], // success
  }
  console.log(`${launch.flightNumber} ${launch.mission}`)
  await saveLaunch(launch)
}
}




const SPACEX_URL = 'https://api.spacexdata.com/v4/launches/query'
const loadLaunchData = async () => {
    console.log('downloaded launch data')
    const firstLaunch = await findLaunch({
        flightNumber :1,
        rocket :'Falcon 1',
        mission: 'FalconSat'
    })
if(firstLaunch){
    console.log('launch data already loaded')

}else{
   await populateLaunches()
}



}

module.exports = {
  launches,
  loadLaunchData,
  getAllLaunches,
  addNewLaunch,
  exitsLaunchWithId,
  abortLaunchById,
}
