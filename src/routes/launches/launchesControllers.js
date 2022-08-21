const {
  getAllLaunches,
  addNewLaunch,
  exitsLaunchWithId,
  abortLaunchById,
} = require('../../model/launchModel')



const defaultPageNum = 1
const defaultLimitNum = 0
const pagePagination = (query) => {
  const page = Math.abs(query.page) || defaultPageNum
  const limit = Math.abs(query.limit) || defaultLimitNum
  const skip = (page - 1) * limit

  return { skip, limit }
}
const httpGetAllLaunches = async(req, res) => {
     const { skip, limit } = pagePagination(req.query)
    res.status(200).json(await getAllLaunches(skip, limit))
}
const httpAddNewLaunch =  async (req, res)=>{
   const launch = req.body

   if(!launch.mission || !launch.rocket || !launch.target  || !launch.launchDate){
    return res.status(400).json({
        error : 'invalid input provided / missing required launch property'
    })
   }


launch.launchDate = new Date(launch.launchDate)

if(isNaN(launch.launchDate)){
    return  res.status(400).json({
        error : 'invalid launch date input'
    })
}
  await  addNewLaunch(launch )

 return   res.status(201).json(launch)
}

const httpAbortMission = async (req, res)=>{
const launchId = +req.params.id
    const existsLaunch =  await  exitsLaunchWithId(launchId)

if(!existsLaunch){
return   res.status(404).json({
    error :"id not found!"
})
}

const aborted = await abortLaunchById(launchId)
if(!aborted){
    return res.status(400).json({
        error : 'launch not aborted'
    })
}
return res.status(200).json({ok:true})
}


module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortMission,
}