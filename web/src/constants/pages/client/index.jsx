const formInfo = [
    {field:"input", title:"Nome"       , type:"text"    , placeholder:"Nome do cliente", key:"name"},
    {field:"input", title:"E-mail"     , type:"email"   , placeholder:"E-mail"         , key:"email"},
    {field:"input", title:"Fone"       , type:"text"    , placeholder:"Telefone"       , key:"phone"},
    {field:"input", title:"Senha"      , type:"password", placeholder:"Senha"          , key:"passwd"},
    {field:"input", title:"Foto"       , type:"text"    , placeholder:"Foto"           , key:"photo"},
    {field:"input", title:"Data nasc." , type:"text", placeholder:"Data de nascimento" , key:"dateBirth"},
    
    {field:"select", title:"Tipo do documento", options:[{value:"cpf", description:"CPF"},{value:"cnpj",description:"CNPJ"}], key:"document"},
    {field:"input", title:"Nº do documento", type:"text", placeholder:"Nº do documento", key:"document"},

    {field:"select", title:"Sexo", options:[{value:"M",description:"Masculino"},{value:"F",description:"Feminino"}], key:"sex"},
    // {field:"input", title:"..."     , type:"text", placeholder:""     , key:""},
    {field:"input", title:"Status"     , type:"text", placeholder:"Status"     , key:"status"},

    {field:"input", title:"Logradouro" , type:"text", placeholder:"Rua"        , key:"street"},
    {field:"input", title:"Número"     , type:"number", placeholder:"Número"   , key:"number"},
    {field:"input", title:"Bairro"     , type:"text", placeholder:"Bairro"     , key:"district"},
    {field:"input", title:"CEP"        , type:"text", placeholder:"CEP"        , key:"zipcode"},
    {field:"input", title:"Cidade"     , type:"text", placeholder:"Cidade"     , key:"city"},
    {field:"input", title:"UF"         , type:"text", placeholder:"UF"         , key:"state"},
    {field:"input", title:"País"       , type:"text", placeholder:"País"       , key:"country"},
    
    {field:"input", title:"Id customer", type:"text", placeholder:"Id customer", key:"customerId"},    
]


export {
    
    formInfo,

}