const _ =require('lodash')
const moment = require('moment')

const { createPayment } = require('../../utils/external/pagarme')
const SchedulingRepository = require('../repositories/schedulling.repository')


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
    const { found } = await SchedulingRepository.findFull(clientId, salonId, collaboratorId, serviceId)
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
const filters = async ( salonId, period, query={}, filters={}) => {
    console.log('schedulingService::filters', salonId, period)
    const { schedules } = await SchedulingRepository.find(
        {
            salonId,
            date:{
                $gte: moment(period.start).startOf('day'),  // >= primeiro min do dia
                $lte: moment(period.end).endOf('day'),      // <= ultimo   min do dia
            },
            ...query
        }, 
        filters,
        [
            { path:'serviceId', select:'title duration'},
            { path:'collaboratorId', select:'name'},
            { path:'clientId', select:'name'}
        ]
    )

    return { error:false, message:'Agendamento por período.', periodo:period, schedules}
}


module.exports = {
    
    get,
    post,
    filters,

}