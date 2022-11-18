// Era pra ser um events.json, nao nao teve como por causa do moment
import moment from 'moment'

//Usado em Calender:
const events = [
    { 
        "title":"Evento tests",
        "start": moment().toDate(),
        "end":   moment().add(90,'minutes').toDate()
    }
]


export {
    
    events,

}