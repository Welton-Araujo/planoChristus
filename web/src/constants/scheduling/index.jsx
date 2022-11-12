import moment from 'moment'


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