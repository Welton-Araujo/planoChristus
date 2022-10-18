/**
 * @CODE Possui a variavel de code e mensagens http padrão:
*/

const _statusCode = {
    '100'  : 'Continuar' ,
    '101'  : 'Mudança de protocolos' ,
    '102'  : 'Processando' ,             // RFC2518

    '200'  : 'OK' ,
    '201'  : 'Criado' ,
    '202'  : 'Aceito' ,
    '203'  : 'Informação não autorizada' ,
    '204'  : 'Sem conteúdo' ,
    '205'  : 'Redefinir conteúdo' ,
    '206'  : 'Conteúdo parcial' ,
    '207'  : 'Multi-status' ,           // RFC4918
    '208'  : 'Já relatado' ,       // RFC5842
    '226'  : 'IM usado' ,                // RFC3229

    '300'  : 'Múltiplas escolhas' ,
    '301'  : 'Movido Permanentemente' ,
    '302'  : 'Encontrado' ,
    '303'  : 'Ver Outro' ,
    '304'  : 'Não modificado' ,
    '305'  : 'Usar proxy' ,
    '307'  : 'Redirecionamento temporário' ,
    '308'  : 'Redirecionamento permanente' ,     // RFC7238
    
    '400'  : 'Solicitação inválida' ,
    '401'  : 'Não autorizado' ,
    '402'  : 'Pagamento Requerido' ,
    '403'  : 'Proibido' ,
    '404'  : 'Não encontrado' ,//not found
    '405'  : 'Método não permitido' ,
    '406'  : 'Não aceitável' ,
    '407'  : 'Autenticação de proxy necessária' ,
    '408'  : 'Solicitar tempo limite' ,
    '409'  : 'Conflito' ,
    '410'  : 'Não existe mais' ,
    '411'  : 'Comprimento necessário' ,
    '412'  : 'Falha na pré-condição' ,
    '413'  : 'Carga útil muito grande' ,
    '414'  : 'URI muito longo' ,
    '415'  : 'Tipo de mídia não suportado' ,
    '416'  : 'Faixa não satisfatória' ,
    '417'  : 'A expectativa falhou' ,
    '418'  : 'Sou um bule' ,                                                // RFC2324
    '421'  : 'Solicitação mal direcionada ' ,                                          // RFC7540
    '422'  : 'Entidade não processável ' ,                                         // RFC4918
    '423'  : 'Bloqueado' ,                                                       // RFC4918
    '424'  : 'Dependência com falha' ,                                            // RFC4918
    '425'  : 'Reservado para proposta expirada de coleções avançadas WebDAV' ,    // RFC2817
    '426'  : 'Atualização necessária' ,                                             // RFC2817
    '428'  : 'Pré- condição necessária' ,                                        // RFC6585
    '429'  : 'Muitos pedidos' ,                                            // RFC6585
    '431'  : 'Solicitar campos de cabeçalho muito grandes' ,                              // RFC6585
    '451'  : 'Indisponível por motivos legais' ,                                // RFC7725

    '500'  : 'Erro interno do servidor' ,
    '501'  : 'Não implementado' ,
    '502'  : 'Gateway ruim' ,
    '503'  : 'Serviço indisponível' ,
    '504'  : 'Tempo limite do gateway' ,
    '505'  : 'Versão HTTP não suportada' ,
    '506'  : 'Variante também negocia' ,                                      // RFC2295
    '507'  : 'Armazenamento insuficiente' ,                                         // RFC4918
    '508'  : 'Loop detectado' ,                                                // RFC5842
    '510'  : 'Não estendido' ,                                                 // RFC2774
    '511'  : 'Autenticação de rede necessária' ,                              // RFC6585
}


module.exports = { _statusCode }