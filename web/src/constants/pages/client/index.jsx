/**
 * @CONSTANTS Utilizar na page client
 */

export const formInfo = {
    name:   {title:"Nome", type:"text"    , placeholder:"Nome do cliente", key:"name"},
    email:  {title:"E-mail"     , type:"email"   , placeholder:"E-mail"         , key:"email"},
    phone:  {title:"Fone"       , type:"text"    , placeholder:"Telefone"       , key:"phone"},
    passwd: {title:"Senha"      , type:"password", placeholder:"Senha"          , key:"passwd"},
    photo:  { title:"Foto"       , type:"text"    , placeholder:"Foto"           , key:"photo"},
    dateBirth:{title:"Data nasc." , type:"text", placeholder:"Data de nascimento" , key:"dateBirth"},

    docSel:{title:"Tipo do documento", key:"document", 
        options:[
            {value:"cpf", description:"CPF"},
            {value:"cnpj",description:"CNPJ"}
        ]
    },
    docInp:{title:"Documento", key:"document",
        many:[
            {title:"Nº do documento"  , type:"text", placeholder:"Nº do documento"  , key:"number"},
            // {title:"Tipo de documento", type:"text", placeholder:"Tipo de documento", key:"type"},
        ]
    },
    sex:{title:"Sexo", key:"sex", 
        options:[
            {value:"M",description:"Masculino"},
            {value:"F",description:"Feminino"}
        ]
    },
    // {title:"..."     , type:"text", placeholder:""     , key:""},
    status:{title:"Status", key:"status", 
        options:[
            {value:"A",description:"Ativo"},
            {value:"I",description:"Inativo"}
        ]
    },
    address:{title:"Documento", key:"address",
        many:[
            {title:"Logradouro" , type:"text", placeholder:"Rua"        , key:"street"},
            {title:"Número"     , type:"number", placeholder:"Número"   , key:"number"},
            {title:"Bairro"     , type:"text", placeholder:"Bairro"     , key:"district"},
            {title:"CEP"        , type:"text", placeholder:"CEP"        , key:"zipCode"},
            {title:"Cidade"     , type:"text", placeholder:"Cidade"     , key:"city"},
            {title:"UF"         , type:"text", placeholder:"UF"         , key:"state"},
            {title:"País"       , type:"text", placeholder:"País"       , key:"country"},
        ]
    },
    customer:{title:"Id customer", type:"text", placeholder:"Id customer", key:"customerId"},
    geo:{ title:"Geo localização", key:"geo",
        many:[
            {type:"text", title:"Latitude", placeholder:"Latitude", key:"coordinates"},
            {type:"text", title:"Longetide", placeholder:"Longetude", key:"coordinates"}
        ]
    },
}
