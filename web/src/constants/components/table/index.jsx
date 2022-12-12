import { Tag } from 'rsuite'
import moment from 'moment'


export const clientTable = {
    "style":{
        "height":447
    },
    "header":[
        {"label":"status",  "key":"status", "fixed":true, "style":{"width":90,"align":"left"}, "content":({status})=>getStatus({status, icon:"user"}), },
        {"label":"id",      "key":"id", "fixed":false, "style":{"width":250,"align":"center"}, "content":({id})=><Tag color={""}>{id}</Tag>, },
        {"label":"nome",    "key":"name","fixed":false, "style":{"width":220,"align":"left"}},
        {"label":"fone",    "key":"phone","fixed":false, "style":{"width":150,"align":"left"}},
        {"label":"email",   "key":"email", "fixed":false, "style":{"width":240,"align":"left"}},
        {"label":"foto",    "key":"photo", "fixed":false, "style":{"width":350,"align":"left"}},
        {"label":"data nasc.", "key":"dateBirth", "fixed":false, "style":{"width":150,"align":"left"}, "content":({dateBirth})=>`${moment(dateBirth).format('DD/MM/YYYY')}`, },
        {"label":"sexo",    "key":"sex", "fixed":false, "style":{"width":100,"align":"left"}, "content":({sex=""})=>sex.toLowerCase()==='m' ? "Masculino":"Feminino", },
        {"label":"id customer",   "key":"customerId", "fixed":false, "style":{"width":120,"align":"left"}},
        {"label":"data cadastro", "key":"dateRegistration", "fixed":false, "style":{"width":130,"align":"left"}, "content":({dateRegistration})=>`${moment(dateRegistration).format('DD/MM/YYYY')}`, },

        {"label":"logradouro",  "key":"address.street", "fixed":false, "style":{"width":240,"align":"left"}},
        {"label":"nº da casa",  "key":"address.number", "fixed":false, "style":{"width":100,"align":"left"}},
        {"label":"cep",         "key":"address.zipCode", "fixed":false, "style":{"width":90,"align":"left"}},
        {"label":"bairro",      "key":"address.district", "fixed":false, "style":{"width":240,"align":"left"}},
        {"label":"cidade",      "key":"address.city", "fixed":false, "style":{"width":240,"align":"left"}},
        {"label":"uf",          "key":"address.state", "fixed":false, "style":{"width":80,"align":"left"}},
        {"label":"país",        "key":"address.country", "fixed":false, "style":{"width":140,"align":"left"}},

        {"label":"tipo doc", "key":"document.type", "fixed":false, "style":{"width":80,"align":"left"}},
        {"label":"nº doc",   "key":"document.number", "fixed":false, "style":{"width":140,"align":"left"}},

        {"label":"lat",  "key":"geo.coordinates.0", "fixed":false, "style":{"width":120,"align":"left"}},
        {"label":"long", "key":"geo.coordinates.1", "fixed":false, "style":{"width":120,"align":"left"}}
    ]
}

export const collaboratorTable = {
    "style":{
        "height":447
    },
    "header":[
        {"label":"status",  "key":"status", "fixed":true, "style":{"width":90,"align":"left"}, "content":({status})=>getStatus({status, icon:"worker"}), },
        {"label":"id",      "key":"id", "fixed":false, "style":{"width":250,"align":"center"}, "content":({id})=><Tag color={""}>{id}</Tag>, },
        {"label":"nome",    "key":"name","fixed":false, "style":{"width":250,"align":"left"}},
        {"label":"fone",    "key":"phone","fixed":false, "style":{"width":150,"align":"left"}},
        {"label":"email",   "key":"email", "fixed":false, "style":{"width":240,"align":"left"}},
        {"label":"foto",    "key":"photo", "fixed":false, "style":{"width":350,"align":"left"}},
        {"label":"data nascimento", "key":"dateBirth", "fixed":false, "style":{"width":150,"align":"left"}, "content":({dateBirth})=> `${moment(dateBirth).format('DD/MM/YYYY')}`, },
        {"label":"sexo", "key":"sex", "fixed":false, "style":{"width":100,"align":"left"}, "content":({sex=""})=>sex.toLowerCase()==='m' ? "Masculino":"Feminino", },
        {"label":"id recipient", "key":"recipientId", "fixed":false, "style":{"width":100,"align":"left"}},
        {"label":"data cadastro","key":"dateRegistration", "fixed":false, "style":{"width":180,"align":"left"}, "content":({dateRegistration})=> dateRegistration, },
        {"label":"agencia",     "key":"bankAccount.agency", "fixed":false, "style":{"width":100,"align":"left"}},
        {"label":"banco",       "key":"bankAccount.bank", "fixed":false, "style":{"width":100,"align":"left"}},
        {"label":"nº da conta", "key":"bankAccount.number", "fixed":false, "style":{"width":150,"align":"left"}},
        {"label":"dv",          "key":"bankAccount.dv", "fixed":false, "style":{"width":90,"align":"left"}},
        {"label":"tipo",        "key":"bankAccount.type", "fixed":false, "style":{"width":200,"align":"left"}},
        {"label":"cpf/cnpj",    "key":"bankAccount.cpfCnpj", "fixed":false, "style":{"width":120,"align":"left"}},
        {"label":"titular",     "key":"bankAccount.owner", "fixed":false, "style":{"width":240,"align":"left"}}

    ]
}

export const scheduleTable = {
    "style":{
        "height":447
    },
    "header":[
        {"label":"status",        "key":"status", "fixed":true, "style":{"width":90,"align":"left"}, "content":({status})=>getStatus({status, icon:"worker"}), },
        {"label":"id",            "key":"id", "fixed":false, "style":{"width":250,"align":"center"}, "content":({id})=><Tag color={""}>{id}</Tag>, },
        {"label":"ID salão",      "key":"salonId","fixed":false, "style":{"width":250,"align":"left"}},
        {"label":"Dias",          "key":"day","fixed":false, "style":{"width":150,"align":"left"}},
        {"label":"Serviços",      "key":"service","fixed":false, "style":{"width":150,"align":"left"}},
        {"label":"Colaboradores", "key":"collaborators", "fixed":false, "style":{"width":240,"align":"left"}},
        {"label":"data cadastro", "key":"dateRegistration", "fixed":false, "style":{"width":180,"align":"left"}, "content":({dateRegistration})=> dateRegistration, },
    ]
}

export const serviceTable = {
    "style":{
        "height":447
    },
    "header":[
        {"label":"status",   "key":"status", "fixed":true, "style":{"width":90,"align":"left"}, "content":({status})=>getStatus({status, icon:"service"}), },
        {"label":"id",       "key":"id", "fixed":false, "style":{"width":250,"align":"center"}, "content":({id})=><Tag color={""}>{id}</Tag>, },
        {"label":"título",   "key":"title","fixed":false, "style":{"width":250,"align":"left"}},
        {"label":"preço",    "key":"price","fixed":false, "style":{"width":100,"align":"left"}, "content":({price})=>`R$ ${price.toFixed(2)}`, },
        {"label":"duração",  "key":"duration", "fixed":false, "style":{"width":100,"align":"left"}, "content":({duration})=>`${moment(duration).format('HH:mm')}`, },
        {"label":"comissão", "key":"commission", "fixed":false, "style":{"width":90,"align":"left"}, "content":({commission})=> `${commission}%`, },
        {"label":"recorrência",   "key":"recurrence", "fixed":false, "style":{"width":120,"align":"left"},"content":({recurrence})=> `${recurrence} dias`, },
        {"label":"descrição",     "key":"description", "fixed":false, "style":{"width":300,"align":"left"}},
        {"label":"data cadastro", "key":"dateRegistration", "fixed":false, "style":{"width":130,"align":"left"}, "content":({dateRegistration})=> `${moment(dateRegistration).format('DD/MM/YYYY')}`, },
        
        // {"label":"Arquivo",        "key":"file", "fixed":false, "style":{"width":300,"align":"left"}}
    ]
}


/**
 * @AUX FUNÇOES e CONST
 */
const getStatus = ({status="a", icon="user"}) =>{    
    return  <Tag color={statusConf.color[status]}>
                <span className={statusConf[icon][status]}> {statusConf.text[status]}</span>
            </Tag>
}

const statusConf = {
    color:{
        a:"blue",
        i:"",
        e:"red"
    },
    text:{
        a:"Ativo",
        i:"Inativo",
        e:"Excluído"
    },
    user:{
        a:"mdi mdi-account-check",
        i:"mdi mdi-account-alert-outline",
        e:"mdi mdi-account-cancel-outline"
    },
    worker:{
        a:"mdi mdi-account-hard-hat",
        i:"mdi mdi-account-hard-hat-outline",
        e:"mdi mdi-account-hard-hat-outline"
    },
    service:{
        a:"mdi mdi-cog",
        i:"mdi mdi-cog-outline",
        e:"mdi mdi-cog-off"
    }
}