const mongoose = require('mongoose')
const { createCustomerPagarme }  = require('../../utils/external/pagarme')
const { isEmpty } = require('../../utils/validations')

const ClientRepository      = require('../repositories/client.repository')
const SalonClientRepository = require('../repositories/relationship/salonClient.repository')


/**  **/
const get = async ( query={}, fields='' )=>{    
    console.log('ClientService::post Pagar.me' )
    return ClientRepository.find(query, fields)
}

/** AULA **
 * @Info USO DO POPULATE() NA CONSULTA noSQL.
 * @param {*} salonId 
 * @param {*} fields 
 * @returns 
 */
const getSalonClients = async ( salonId, fields='clientId status dateRegistration' )=>{    
    console.log('ClientService::getSalonClients', salonId, fields )
    
    //BUSCAR RELACIONAMETO:
    const { salonClients } = await SalonClientRepository.find(
        { salonId, status:{$ne:'E'} },//query
        fields, 
        { path:'clientId', select:'-passwd -customertId' }//populate
    )
    if( isEmpty(salonClients) ){ return {error:true, message:'Salão sem cliente(s).', clients:[] } }

    return { 
        error:false, 
        message:'Cliente(s) encontrado.', 
        clients:salonClients.map((salCli)=>({
            ...salCli.clientId._doc,
            salonClientId: salCli._id,
            status: salCli.status,
            dateRegistration: salCli.dateRegistration
        }))
    }
}

/*** AULA API Pagar.me ***
 * 
 * @param {*} salonId 
 * @param {*} clientCandidate 
 * @returns 
 */
const post = async ( salonId, clientCandidate )=>{    
    console.log('ClientService::post Pagar.me', salonId,  )
    const db = mongoose.connection
    const session = await db.startSession()
    session.startTransaction()

    //BUSCAR CLIENTE:
    const { oldClient } = await ClientRepository.findOne({
        $or:[ 
            { email: clientCandidate.email },
            { phone: clientCandidate.phone }
        ]
    })
    if( oldClient ){ return{ error:true, message:'Clinte já cadastrado.' } }
    
    //CRIAR CUSTOMER Pagar.me:
    const _id = mongoose.Types.ObjectId()
    const pagarmeCustomer = await createCustomerPagarme(_id, clientCandidate)
    // if( pagarmeCustomer.error ){ return{ error:true, message:'Erro, cliente no Pagar.me.', pagarmeCustomer }}

    //NOVO CLIENTE:
    const { error, newClient } = await ClientRepository.save({
        _id,
        ...clientCandidate,
        customerId: pagarmeCustomer.id || '0'
    })
    if( !newClient ){ return{ error:true, message:'Erro ao criar o cliente.', error, newClient }}
    
    //BUSCAR RELACIONAMENTO NO DB:
    const { salonClient } = await SalonClientRepository.findById(clientCandidate.id)
    if( salonClient ){ return{ error:true, message:'Erro, já existe o cliente para este salão.' }}

    //CRIAR RELACIONAMENTO: 
    await SalonClientRepository.save({
        salonId,
        clientId: newClient.id,
    })
    
    await session.commitTransaction()
    session.endSession()

    return { error:false, message:'Cliente cadastrado no salão com sucesso.', client:newClient }

}

/*** ***
 * 
 * @param {*} clientId 
 * @param {*} bond 
 * @param {*} bondId salonId
 * @param {*} services 
 * @returns 
 */
const put = async ( clientId, status, salColId , services )=>{
    console.log('ClientService::put', clientId, salColId, status, services)
    const db = mongoose.connection
    const session = await db.startSession()
    session.startTransaction()

    //BUSCAR CLIENTE:
    const { oldCollaborator } = await ClientRepository.findOne({_id: clientId})
    if( !oldCollaborator ){ return{ error:true, message:'Colaborador não existe.' } }
    
    //ATUALIZA RELACIONAMENTO: (UPDATE STATUS)
    await SalonClientRepository.findByIdAndUpdate(salColId, { status })

    //DELETAR RELACIONAMENTO: (DEL SERVICES)
    const { delCollaboratorServices } = await SalonClientRepository.deleteMany({clientId})
    console.log('delCollaboratorServices', delCollaboratorServices)

    //INSERIR RELACIONAMENTO: (INSERT SERVICES) 
    await SalonClientRepository.insertMany(
        services.map((serviceId)=>({ serviceId, clientId }))
    )

    await session.commitTransaction()
    session.endSession()

    return { error: true, message: 'Atualizado com sucesso.' }
 }

/** AULA **/
const deleteById = async (id) => {
    console.log('ClientService::deleteById', id)
    //BUSCAR RELACIONAMENTO:
    const { upSalonClient } = await SalonClientRepository.findByIdAndUpdate(id, {status:'E'})
    if( !upSalonClient ){ return { error: true, message: 'Erro ao deletar.' } }
    
    return { error: true, message: 'Deletado com sucesso.' }
}

const filters = async (filters={}) => {
    console.log('ClientService::filters')
    return ClientRepository.filters(filters)
}

module.exports = {

    get,
    // getById,
    getSalonClients,
    post,
    put,
    deleteById,
    filters,

}