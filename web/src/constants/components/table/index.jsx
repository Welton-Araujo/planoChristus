import { Tag } from 'rsuite'
import moment from 'moment'


export const clientTable = {
    "style":{
        "height":447
    },
    "header":[
        {"label":"status",      "key":"status", "fixed":true, "style":{"width":70,"align":"left"}, "content":({status})=>{
            const color = (status==="a") ? "blue":(status==="i" ? "":"red")
            const value = (status==="a") ? "ativo":(status==="i" ? "inativo":"excluído")
            return <Tag color={color}>{value}</Tag>
        }},
        {"label":"id",              "key":"id", "fixed":false, "style":{"width":250,"align":"center"},"content":({id})=>{
            return <Tag color={""}>{id}</Tag>
        }},
        {"label":"nome",            "key":"name","fixed":false, "style":{"width":220,"align":"left"}},
        {"label":"fone",            "key":"phone","fixed":false, "style":{"width":150,"align":"left"}},
        {"label":"email",           "key":"email", "fixed":false, "style":{"width":240,"align":"left"}},
        {"label":"foto",            "key":"photo", "fixed":false, "style":{"width":350,"align":"left"}},
        {"label":"data nascimento", "key":"dateBirth", "fixed":false, "style":{"width":150,"align":"left"}, "content":({dateBirth})=>{
            return`${moment(dateBirth).format('DD/MM/YYYY')}`
        }},
        {"label":"sexo",            "key":"sex", "fixed":false, "style":{"width":100,"align":"left"}, "content":({sex=""})=>{
            return sex.toLowerCase()==='m' ? "Masculino":"Feminino"
        }},
        {"label":"id customer",     "key":"customerId", "fixed":false, "style":{"width":120,"align":"left"}},
        {"label":"data cadastro",   "key":"dateRegistration", "fixed":false, "style":{"width":130,"align":"left"}, "content":({dateRegistration})=>{
            return`${moment(dateRegistration).format('DD/MM/YYYY')}`
        }},

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
        {"label":"status",      "key":"status", "fixed":true, "style":{"width":70,"align":"left"}, "content":({status})=>{
            const color = (status==="a") ? "blue":(status==="i" ? "":"red")
            const value = (status==="a") ? "ativo":(status==="i" ? "inativo":"excluído")
            return<Tag color={color}>{value}</Tag>
        }},
        {"label":"id",              "key":"id", "fixed":false, "style":{"width":250,"align":"center"}, "content":({id})=>{
            return <Tag color={""}>{id}</Tag>
        }},
        {"label":"nome",            "key":"name","fixed":false, "style":{"width":250,"align":"left"}},
        {"label":"fone",            "key":"phone","fixed":false, "style":{"width":150,"align":"left"}},
        {"label":"email",           "key":"email", "fixed":false, "style":{"width":240,"align":"left"}},
        {"label":"foto",            "key":"photo", "fixed":false, "style":{"width":350,"align":"left"}},
        {"label":"data nascimento", "key":"dateBirth", "fixed":false, "style":{"width":150,"align":"left"}, "content":({dateBirth})=>{
            return`${moment(dateBirth).format('DD/MM/YYYY')}`
        }},
        {"label":"sexo",            "key":"sex", "fixed":false, "style":{"width":100,"align":"left"}, "content":({sex=""})=>{
            return sex.toLowerCase()==='m' ? "Masculino":"Feminino"
        }},
        {"label":"id recipient",    "key":"recipientId", "fixed":false, "style":{"width":100,"align":"left"}},
        {"label":"data cadastro (milis)",   "key":"dateRegistration", "fixed":false, "style":{"width":180,"align":"left"}, "content":({dateRegistration})=>{
            return dateRegistration//`${moment(dateRegistration).format('DD/MM/YYYY')}`
        }},

        {"label":"agencia",     "key":"bankAccount.agency", "fixed":false, "style":{"width":100,"align":"left"}},
        {"label":"banco",       "key":"bankAccount.bank", "fixed":false, "style":{"width":100,"align":"left"}},
        {"label":"nº da conta", "key":"bankAccount.number", "fixed":false, "style":{"width":150,"align":"left"}},
        {"label":"dv",          "key":"bankAccount.dv", "fixed":false, "style":{"width":90,"align":"left"}},
        {"label":"tipo",        "key":"bankAccount.type", "fixed":false, "style":{"width":200,"align":"left"}},
        {"label":"cpf/cnpj",    "key":"bankAccount.cpfCnpj", "fixed":false, "style":{"width":120,"align":"left"}},
        {"label":"titular",     "key":"bankAccount.owner", "fixed":false, "style":{"width":240,"align":"left"}}

    ]
}

export const serviceTable = {
    "style":{
        "height":447
    },
    "header":[
        {"label":"status",      "key":"status", "fixed":true, "style":{"width":70,"align":"left"}, "content":({status})=>{
            const color = (status==="a") ? "blue":(status==="i" ? "":"red")
            const value = (status==="a") ? "ativo":(status==="i" ? "inativo":"excluído")
            return<Tag color={color}>{value}</Tag>
        }},
        {"label":"id",          "key":"id", "fixed":false, "style":{"width":250,"align":"center"}, "content":({id})=>{
            return <Tag color={""}>{id}</Tag>
        }},
        {"label":"título",      "key":"title","fixed":false, "style":{"width":250,"align":"left"}},
        {"label":"preço",       "key":"price","fixed":false, "style":{"width":100,"align":"left"}, "content":({price})=>{
            return`R$ ${price.toFixed(2)}`
        }},
        {"label":"duração",     "key":"duration", "fixed":false, "style":{"width":100,"align":"left"}, "content":({duration})=>{
            return`${moment(duration).format('HH:mm')}`
        }},
        {"label":"comissão",    "key":"commission", "fixed":false, "style":{"width":90,"align":"left"}, "content":({commission})=>{
            return`${commission}%`
        }},
        {"label":"recorrência", "key":"recurrence", "fixed":false, "style":{"width":120,"align":"left"},"content":({recurrence})=>{
            return`${recurrence} dias`
        }},
        {"label":"descrição",   "key":"description", "fixed":false, "style":{"width":300,"align":"left"}},
        {"label":"data cadastro", "key":"dateRegistration", "fixed":false, "style":{"width":130,"align":"left"}, "content":({dateRegistration})=>{
            return`${moment(dateRegistration).format('DD/MM/YYYY')}`
        }},
        
        // {"label":"Arquivo",        "key":"file", "fixed":false, "style":{"width":300,"align":"left"}}
    ]
}

