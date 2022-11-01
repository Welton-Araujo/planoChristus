/**
 * @ACTIONS
 * @SCHEDULINS
*/

const lodash = require('lodash')
const moment = require('moment')

const { isEmpty } = require('../validations')
const { 
    dateToMin, 
    datePlusMin,
    sliceMinutes, 
    mergeDateTime,
} = require('../operations/time')
const { splitArrayByValue } = require('../operations/others')

const SchedulingRepository = require('../../api/repositories/schedulling.repository')


const filterSchedules = async (schedules, WEEKDAY, serviceId) =>{
    return schedules.filter( hour =>{
        //VERIFICAR DISPONIBILIDADES: DIAS E SERVICOS
        const availableDay      = hour.day.includes(WEEKDAY)
        const availableServices = hour.services.includes(serviceId)
        return availableDay && availableServices
    })
}

const findHours = async (freeSpaces, lastDay) =>{
    console.log('findHours::', lastDay, )
    let allHoursDay = {}
    for (const space of freeSpaces) {
        for (const collaboratorId of space.collaborators) {
            //CRIAR SE NAO EXISTIR: []
            if(!allHoursDay[collaboratorId]){
                allHoursDay[collaboratorId] = []
            }

            //SLICES LASTDAY: START TO END
            const lastDayStart = mergeDateTime(lastDay, space.start)
            const lastDayEnd   = mergeDateTime(lastDay, space.end)
            const sliceLastDay = await sliceMinutes(lastDayStart, lastDayEnd)
            
            //ADD: HOUR + SLICES
            allHoursDay[collaboratorId] = [ 
                ...allHoursDay[collaboratorId],
                ...sliceLastDay
            ]
        }
    }
    return allHoursDay
}

const getFreeSchedules = async (allHoursDay, lastDay, serviceSlots)=>{
    console.log('checkHours::', lastDay, )
    let busySchedules       = []
    let busySchedulesSlice  = []
    let freeSchedules       = []
    let newAllHoursDay      = {}

    for (const collaboratorId of Object.keys(allHoursDay)) {
        //RECUPERAR AGENDAMENTOS:
        const { schedules } = await SchedulingRepository.find(
            {
                collaboratorId,
                date:{ 
                    $gte: moment(lastDay).startOf('day'), 
                    $lte: moment(lastDay).endOf('day') 
                }
            },
            'date serviceId -_id',
            { path:'serviceId', select:'duration'}
        )
        //CHECK: BUSCAR HORARIOS OCUPADOS: [ {start,end},... ]
        for(const schedule of schedules){
            const scheduleMin     = await dateToMin(schedule.serviceId.duration) // Date => minutes
            const schedulePlusMin = await datePlusMin(schedule.date, scheduleMin)// Date + minutes
            busySchedules.push({
                start: moment(schedule.date),
                end: schedulePlusMin
            })
        }
        console.log('busySchedules CHECK ....', busySchedules)
        //CHECK: CRIA SLICE DOS HORARIOS OCUPADOS: [ SLICES... ] 
        for(const busySchedule of busySchedules){
            busySchedulesSlice = await sliceMinutes(busySchedule.start, busySchedule.end)
        }
        console.log('busySchedulesSlice ....', busySchedulesSlice)
        
        //REMOVER SLOTS OCUPADOS:
        const freeSchedulesTemp = await allHoursDay[collaboratorId].map((freeSchedule)=>{
            // console.log('.............', busySchedulesSlice.includes(freeSchedule), freeSchedule)
            return busySchedulesSlice.includes(freeSchedule) ? '-' : freeSchedule
        })
        //HORARIOS LIVRES: COM ARRAY DIVIDIDO (REMOVER ARRAYS VAZIOS)
        freeSchedules = splitArrayByValue(freeSchedulesTemp, '-').filter(arr=>arr.length>0)

        //REMOVER SLOT SEM ESPAÇOS (QTD HORARIOS <):
        freeSchedules = freeSchedules.filter(schedule=> (schedule.length >= serviceSlots.length) )

        //REMOVER HORARIOS NAO MARCAVEIS (FINAIS):
        freeSchedules = freeSchedules.map((slot)=> slot.filter((_, i)=> (slot.length-i >= serviceSlots.length))).flat()
        freeSchedules = lodash.chunk(freeSchedules,2)// Array de dois em dois

        //ADD HORARIOS LIVRES:
        if (freeSchedules.length === 0) {
            newAllHoursDay = lodash.omit(allHoursDay, collaboratorId)//remover id[vazio]
        } else {
            newAllHoursDay[collaboratorId] = freeSchedules
        }
        // console.log('newAllHoursDay ....', newAllHoursDay, )
    }
    return newAllHoursDay
}

/**
 * @Info    
 * @param {*} schedules Array Horarios
 * @param {*} lastDay   Number
 * @param {*} serviceId Mogoose.ObjectId
 * @param {*} markDays  Number Quantidade de dias livres a serem buscados. 
 * @param {*} limit     Number Quantidade de repetiçoes da busca.
 * @returns 
 */
const findAvailableDays = async (schedules, date, serviceId, serviceSlots, markDays=7, limit=365) =>{
    console.log('findAvailableDays::', date, serviceId, )
    const collaborators = []
    const agenda        = []
    let   lastDay       = moment(date)         // ERRO: HORA SEMPRE ESTAR 23:59:59
    const WEEKDAY       = moment(lastDay).day()// 0 ate 6

    //BUSCAR 365 DIAS ATE A AGENDA SER PREENCHIDA:
    for (let day=0; (day <= limit) && (agenda.length <= markDays); day++) {
        //FILTRAR HORARIOS:
        const freeSpaces = await filterSchedules(schedules, WEEKDAY, serviceId)

        //CRIAR AGENDA:
        if (freeSpaces.length > 0) {
            //BUSCAR HORARIOS E ADD EM COLABORADOR:
            const allHoursDay = await findHours(freeSpaces, lastDay)

            //VERIFICAR QUAIS HORARIOS DO COLABORADOR ESTAO LIVRES:
            const freeSchedules = await getFreeSchedules(allHoursDay, lastDay, serviceSlots)
            
            const totalServices = Object.keys(freeSchedules).length
            //ADD AGENDA:
            if( totalServices > 0 ){
                collaborators.push(Object.keys(freeSchedules))
                agenda.push({ [lastDay.format('YYYY-MM-DD')]: freeSchedules })
            }
        }
        //AVANÇAR DIA: INCREMENTO + 1 
        lastDay = lastDay.add(1,'day')
    }
    return { 
        collaborators:  lodash.uniq(collaborators.flat()), 
        agenda, 
    }
}


module.exports = {

    findAvailableDays,

}