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

//Usado em pages/Client
const formFields = [
    {title:"Nome"       , type:"text"    , placeholder:"Nome do cliente", key:"name"},
    {title:"E-mail"     , type:"email"   , placeholder:"E-mail"  , key:"email"},
    {title:"Fone"       , type:"text"    , placeholder:"Telefone", key:"phone"},
    {title:"Senha"      , type:"password", placeholder:"Senha"   , key:"passwd"},
    {title:"Foto"       , type:"text"    , placeholder:"Foto"    , key:"photo"},
    {title:"Data nasc." , type:"text", placeholder:"Data de nascimento", key:"dateBirth"},
    {title:"Status"     , type:"text", placeholder:"Status", key:"status"},
    {title:"Id customer", type:"text", placeholder:"Id customer", key:"customerId"},
]

export {
    
    events,
    formFields,

}