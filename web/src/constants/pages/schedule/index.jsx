
//Usado em Calendar:
/**
 * @EXPLICACAO  Segundo a Video-aula, tanto faz a escolha de qualquer semana.
 *              Servira para fixar no Calendar (dom, seg, ter, qua, qui, sex, sab), independentemente de qual semana seja.
 * @Info        Mesmo com essa explicacao, foi definido a captura automatizado das vars.
 */

const YEAR  = new Date().getFullYear()
const MONTH = new Date().getMonth()
const DAY   = new Date().getDate()

const daysWeekData = [
    new Date(YEAR, MONTH, DAY+0, 0, 0 ,0 ,0),
    new Date(YEAR, MONTH, DAY+1, 0, 0 ,0 ,0),
    new Date(YEAR, MONTH, DAY+2, 0, 0 ,0 ,0),
    new Date(YEAR, MONTH, DAY+3, 0, 0 ,0 ,0),
    new Date(YEAR, MONTH, DAY+4, 0, 0 ,0 ,0),
    new Date(YEAR, MONTH, DAY+5, 0, 0 ,0 ,0),
    new Date(YEAR, MONTH, DAY+6, 0, 0 ,0 ,0),
]

const daysWeek = [
    "domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sabado",
]

export {
    
    daysWeekData,
    daysWeek,

}