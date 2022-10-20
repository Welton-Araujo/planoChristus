const _ =require('lodash')

const ScheduleRepository = require('../repositories/schedule.repository')
const CollaboratorServiceRepository = require('../repositories/relationship/collaboratorService.repository')


/** AULA **
 *
*/
const get = async (query={}, fields='')=>{
    console.log('ScheduleService::get')
    return ScheduleRepository.find(query, fields)
}

/** AULA **
 *
*/
const getSalonSchedules = async ( salonId, query={}, fields='')=>{
    console.log('ScheduleService::getSalonSchedules', salonId)
    return ScheduleRepository.find({ salonId, ...query }, fields )
}

/** AULA **
 *
*/
const getById = async (id, fields='')=>{
    console.log('ScheduleService::getById', id)
    return ScheduleRepository.findById(id, fields='')
}

/** AULA **
 *
*/
const post = async (newSchedule)=>{
    console.log('ScheduleService::post', newSchedule)
    return ScheduleRepository.save(newSchedule)    
}

/** AULA **
 *
*/
const postCollaboratorSchedules = async (newServices)=>{
    console.log('ScheduleService::postCollaboratorSchedules', newServices)
    
    //BUSCAR COLABORADORES:
    const { collaboratorServices } = await CollaboratorServiceRepository.find(
        { serviceId:{$in:newServices}, status:'A' },// query
        'collaboratorId -_id',                      //fields
        { path:'collaboratorId', select:'name' }    //populate
    )
    if( !collaboratorServices ){ return{ error:true, message:'Serviço(s) deste colaborador não existe.' } }
    
    //REMOVER OS REGISTROS REPETIDOS USANDO A LIB LODASH:
    const uniqColSer  = _.uniqBy(collaboratorServices, (colSer)=>colSer.collaboratorId._id.toString())
    //FORMATO DO FRONT: [{ label: 'Serviço', value: '12345' }] 
    const collaborators = uniqColSer.map(colSer=>({ 
        label:colSer.collaboratorId.name, 
        value:colSer.collaboratorId._id
    }))

    return { error:false, message: 'Horarios do colaborador salvo.', collaborators }
}

/** AULA **/
const put = async (id, schedule, fields='')=>{
    console.log('ScheduleService::put', id, schedule, fields)
    
    //ATUALIZAR:
    const { oldSchedule } = await ScheduleRepository.findByIdAndUpdate(id, schedule)
    if( !oldSchedule ){ return{ error:true, message:'Horario(s) não existe.' } }

    return { error:true, message:'Horarios encontrados.',schedule:oldSchedule }
}

/** AULA **/
const deleteById = async ( id, email, passwd )=>{
    console.log('ScheduleService::del', id, email, passwd)

    //DELETAR HORARIOS:
    const { oldSchedule } = await ScheduleRepository.deleteById(id)
    if( !oldSchedule ){ return { error:true, message:'Horario(s) não existe.', delete:false } }
    
    return { error:false, message:'Horario(s) excluído.', delete: true } 
}


module.exports = {
    
    get,
    getSalonSchedules,
    getById,
    post,
    postCollaboratorSchedules,
    put,
    deleteById,

}