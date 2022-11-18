/**
 * @CONSTANTS Utilizar na page client
 */

export const formInfo = [
    {field:"input", title:"Nome"       , type:"text"    , placeholder:"Nome do cliente", key:"name"},
    {field:"input", title:"E-mail"     , type:"email"   , placeholder:"E-mail"         , key:"email"},
    {field:"input", title:"Fone"       , type:"text"    , placeholder:"Telefone"       , key:"phone"},
    {field:"input", title:"Senha"      , type:"password", placeholder:"Senha"          , key:"passwd"},
    {field:"input", title:"Foto"       , type:"text"    , placeholder:"Foto"           , key:"photo"},
    {field:"input", title:"Data nasc." , type:"text", placeholder:"Data de nascimento" , key:"dateBirth"},

    {field:"select", title:"Tipo do documento", key:"document", 
        options:[
            {value:"cpf", description:"CPF"},
            {value:"cnpj",description:"CNPJ"}
        ]
    },
    {field:"inputMany", title:"Documento", key:"document",
        many:[
            // {title:"Tipo de documento", type:"text", placeholder:"Tipo de documento", key:"type"},
            {title:"Nº do documento"  , type:"text", placeholder:"Nº do documento"  , key:"number"},
        ]
    },
    {field:"select", title:"Sexo", key:"sex", 
        options:[
            {value:"M",description:"Masculino"},
            {value:"F",description:"Feminino"}
        ]
    },
    // {field:"input", title:"..."     , type:"text", placeholder:""     , key:""},
    {field:"input", title:"Status"     , type:"text", placeholder:"Status"     , key:"status"},
    {field:"inputMany", title:"Documento", key:"address",
        many:[
            {field:"input", title:"Logradouro" , type:"text", placeholder:"Rua"        , key:"street"},
            {field:"input", title:"Número"     , type:"number", placeholder:"Número"   , key:"number"},
            {field:"input", title:"Bairro"     , type:"text", placeholder:"Bairro"     , key:"district"},
            {field:"input", title:"CEP"        , type:"text", placeholder:"CEP"        , key:"zipCode"},
            {field:"input", title:"Cidade"     , type:"text", placeholder:"Cidade"     , key:"city"},
            {field:"input", title:"UF"         , type:"text", placeholder:"UF"         , key:"state"},
            {field:"input", title:"País"       , type:"text", placeholder:"País"       , key:"country"},
        ]
    },
    {field:"input", title:"Id customer", type:"text", placeholder:"Id customer", key:"customerId"},    
]
