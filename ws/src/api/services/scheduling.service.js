const { findAvailableDays } = require('../../utils/actions/scheduling.action')
const { createPayment } = require('../../utils/external/pagarme')
const { 
    firstMinOfDay,
    lastMinOfDay,
    dateToMin,
    datePlusMin,
    sliceMinutes,
} = require('../../utils/operations/time')

const SchedulingRepository   = require('../repositories/schedulling.repository')
const CollaboratorRepository = require('../repositories/collaborator.repository')


/** 
 * 
 * @param {*} query 
 * @param {*} fields 
 * @returns 
 */
const get = async ( query={}, fields='' )=>{
    const { schedules } = await SchedulingRepository.find(query, fields)    
    return { error:false, message:'Agendamento', schedules }
}

/** AULA **
 *
*/
const post = async (clientId, salonId, collaboratorId, serviceId, date)=>{
    console.log('schedulingService::post', clientId, salonId, collaboratorId, serviceId)

    //DADOS DO CARTAO:
    const creditCard = {
        "card_number": "1111 2222 3333 4111",
        "card_cvv": "123",
        "card_expiration_date": "0922",
        "card_holder_name": "Morpheus Fishburne",
    }

    //BUSCAR CLI, SAL, COL, SER:
    const { found } = await SchedulingRepository.findBeforePosting(clientId, salonId, collaboratorId, serviceId)
    //ERRO:
    if( !found.client || !found.salon || !found.collaborator || !found.service  ){ 
        return { error:true, message:'Erro, verifique seus dados', payment:null } 
    }

    //CRIAR PAGAMENTO NO  PAGAR.ME:
    const pagarmePayment = await createPayment({ creditCard, ...found })
    // if( pagarmePayment.error ){ return { error:true, message:'Erro no pagar.me', payment:pagarmePayment.message } }

    //VERIFICAR HORARIO DISPONIVEL:
    //...

    //CRIAR PAGAMENTO:
    const { newScheduling } = await SchedulingRepository.save({
        clientId, 
        salonId, 
        collaboratorId, 
        serviceId, 
        date,
        commission:     found.service.commission,
        value:          found.service.price,
        transactionId:  0//pagarmePayment.data.id
    })

    return { error: true, message:'Agendamento realizado.', scheduling:newScheduling }
}

/** AULA **/
const filters = async (salonId, period, query={}, filters="") => {
    console.log('schedulingService::filters', salonId, period)
    const { schedules } = await SchedulingRepository.find(
        {
            salonId,
            date:{
                $gte: firstMinOfDay(period.start),
                $lte: lastMinOfDay(period.end),
            },
            ...query
        }, 
        filters,
        [
            { path:'serviceId', select:'title duration'},
            { path:'collaboratorId', select:'name'},
            { path:'clientId', select:'name'}
        ]//populate
    )
    return { error:false, message:'Agendamento por período.', salonId, period, schedules}
}

/*** AULA ***/
const availableDays = async (salonId,  serviceId, date, query={}, filters='duration')=>{
    console.log('SchedulingService::availableDays', salonId, serviceId)
    
    //BUSCAR AGENDAMENTOS, SERVIÇOS:
    const { found:{schedules, service} } = await SchedulingRepository.findDays(salonId, serviceId) 
    if( !schedules || !service){ return { error:true, message:'Erro ao buscar agendamentos', days:null } }
    
    //AUX:
    const allMin          = await dateToMin(service.duration)           // Date_Hour_min => AllMin
    const durationPlusMin = await datePlusMin(service.duration, allMin )// Date_Hour_min + minutes
    //MARCACAO DO SERVIÇO:
    const serviceSlots    = await sliceMinutes(service.duration, durationPlusMin, 30) 
    let {
        collaborators,
        agenda
    } = await findAvailableDays(schedules, date, serviceId, serviceSlots)
    
    const { collaborators:colls } = await CollaboratorRepository.find({_id:{ $in:collaborators }},'name photo')

    collaborators = colls.map((coll)=>({
        _id:    coll.id,
        name:   coll.name.split(' ')[0],//primeiro_nome
        photo:  coll.photo
    }))
    // console.log('SchedulingService:: ........ ', durationPlusMin, serviceSlots)

    return { error:false, message:'Agenda disponível', collaborators, agenda }
}


module.exports = {
    
    get,
    post,
    filters,
    availableDays,

}