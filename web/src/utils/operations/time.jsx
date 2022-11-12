/**
 * @OPERATIONS
 * @TIME
 * 
*/
import moment from 'moment'


/**
 * @Info Usa o TimeZone do moment: Data sem diferença de 3h.
 * @param {*} date Date or String(YYYY-MM-DDTHH:mm)
 * @param {*} mask String Default:YYYY-MM-DDTHH:mm
 * @returns Moment_DateBr
 */
const dateTimezoneBR = (date, mask='YYYY-MM-DDTHH:mm')=>{
    return new Date(date).toISOString()
    //return moment(date).format(mask)
}

/**
 * @Info Maior igual (>=) ao Primeiro min do dia
 * @param {*} date 2022-10-17T04:30:15.742Z
 * @returns 
 */
const firstMinOfDay = (date)=>{
    return moment(date).startOf('day')
}

/**
 * @Info Menor igual (<=) ultimo min do dia
 * @param {*} date 
 * @returns 
 */
const lastMinOfDay = (date)=>{
    return moment(date).endOf('day')
}

/**
 * @PROPOSITO PARA USO INTERNO
 * @Info Extrai de um Date a Hora:minutos.
 *       Exemplo: 2022-10-17T04:30:15.742Z => 1:30
 *       ATENCAO para diferença de timezone: 3h
 * @param {*} date Date or string
 * @param {*} mask string
 * @returns String 1:30 
*/
const _dateToHourMin = async (date, mask='HH:mm')=>{
    return moment(date).format(mask)
}

/**
 * @PROPOSITO PARA USO INTERNO
 * @Info Transforma horas em minutos: 1:30 => 90 min
 * @param {*} HourMin string
 * @returns Interger 90 min
 */
const _hourToMin = async (HourMin)=>{
    const [H,m] = HourMin.split(':')
    return (parseInt(H)*60) + parseInt(m)
}

/**
 * @Info Transforma uma Hora:min (de um Date) em minutos.
 * @Example minutos = (Hora em min) + min.  
 * @param {*} date YYYY-MM-DDTHH:mm
 * @returns string minutos
 */
const dateToMin = async (date)=>{
    const hourMin = await _dateToHourMin(date)// Date_hour_min => HourMin
    return _hourToMin(hourMin)                // hourMin       => minutes    
}

/**
 * @Info Soma Minutes a um Moment_date: (Moment_Date0 + minutes)
 * @param {*} date Moment_Date or Date: YYYY-MM-DDTHH:mm
 * @param {*} min String
 * @returns Moment_Date1
 */
const datePlusMin = async (date, min) =>{
    return moment(date).add(min, 'minutes')
}

/**
 * @Info Calcular uma lista de horarios do start ate end(<), com passo(duration).
 * @param {*} start Date or Moment_Date or String(2022-10-17T00:00)
 * @param {*} end   Date or Moment_Date or String(2022-10-17T00:00)
 * @param {*} duration  Number (min)
 * @returns [h0, h1, ...]
 */
const sliceMinutes = async (start, end, duration=30) =>{
    console.log('sliceMinutes::', start, end, duration)
    const slices = []// [1:30, 2:00, 2:30, ...]
    // let count = 0

    //DATE(S):
    let startMoment = moment(start)
    let endMoment   = moment(end)
    
    //ADD TODOS START MENORES QUE END:
    while(startMoment < endMoment){
        slices.push(startMoment.format('HH:mm'))
        //DATE: INCREMENTO + duration_min
        startMoment = startMoment.add(duration, 'minutes')
        // count++
    }
    // console.log('sliceMinutes:: GO', startMoment, endMoment, slices)
    return slices
}

/**
 * 
 * @param {*} date 
 * @param {*} time 
 * @returns
 */
const mergeDateTime = (date, time)=>{
    const dateM = moment(date).format('YYYY-MM-DD')
    const hourM = moment(time).format('HH:mm')
    return `${dateM}T${hourM}`
}


export {

    dateTimezoneBR,
    firstMinOfDay,
    lastMinOfDay,
    _dateToHourMin,
    _hourToMin,
    dateToMin,
    datePlusMin,
    sliceMinutes,
    mergeDateTime,

}