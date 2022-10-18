const ScheduleRepository = require('../repositories/schedule.repository')


/**
 * @Schedule
*/
const get = async (query={}, fields='')=>{
    console.log('ScheduleService::get')
    return ScheduleRepository.find(query, fields)
}

const getById = async (id)=>{
    console.log('ScheduleService::getById', id)
    return ScheduleRepository.findById(id)
}

const post = async (newSchedule)=>{
    console.log('ScheduleService::post', newSchedule)
    return ScheduleRepository.save(newSchedule)    
}

const put = async (id, schedule)=>{
    console.log('ScheduleService::put', id, schedule)    
    
    const respSchedule = await ScheduleRepository.findByIdAndUpdate(id, schedule)
    const resError     = respSchedule.oldSchedule ? false : true
    const resSchedule  = respSchedule ? schedule : null
    return { error: resError, schedule: resSchedule }    
}

const deleteById = async ( id, email, passwd )=>{
    console.log('ScheduleService::del', id, email, passwd)
    try {
        const respSchedule = await ScheduleRepository.findById(id)
        const check = [ !!respSchedule.schedule, respSchedule.schedule.email==email, respSchedule.schedule.passwd==passwd ]
        console.log('DEL', !!respSchedule.schedule, check)

        if( !!respSchedule.schedule && respSchedule.schedule.email==email && respSchedule.schedule.passwd==passwd ){
            await ScheduleRepository.findByIdAndRemove(id)
            return{ delete:true }
        }
        return{ delete:false }
    } catch (error) {
        return{ error: true, message: error.message }        
    }
}

module.exports = {
    
    get,
    getById,
    post,
    put,
    deleteById,

}