const mongoose = require('mongoose')
const { createAccountPagarme }  = require('../../utils/external/pagarme')
const { isEmpty } = require('../../utils/validations')

const CollaboratorRepository        = require('../repositories/collaborator.repository')
const SalonCollaboratorRepository   = require('../repositories/relationship/salonCollaborator.repository')
const CollaboratorServiceRepository = require('../repositories/relationship/collaboratorService.repository')

/**  **/
const get = async ( query={}, fields='' )=>{    
    console.log('CollaboratorService::post Pagar.me' )
    return CollaboratorRepository.find(query, fields)
}

/** AULA **
 * @Info USO DO POPULATE() NA CONSULTA noSQL.
 * @param {*} salonId 
 * @param {*} fields 
 * @returns 
 */
const getSalonCollaborators = async ( salonId, fields='collaboratorId status dateRegistration' )=>{    
    console.log('CollaboratorService::getSalonCollaborators', salonId, fields )
    
    //BUSCAR RELACIONAMETO:
    const { salonCollaborators } = await SalonCollaboratorRepository.find(
        { salonId, status:{$ne:'e'} },//query
        fields, 
        { path:'collaboratorId', select:'-passwd' }//populate
    )
    if( isEmpty(salonCollaborators) ){ return { error:true, message:'Salão sem colaborador(es).' } }

    //CRIAR LISTA COLABORADORES:
    let listCollaborador = []
    let services         = []
    for (const salCol of salonCollaborators) {
        const { collaboratorId=[] } = salCol
        for (const collaborator of collaboratorId) {
            const { oldCollaboratorService } = await CollaboratorServiceRepository.findOne(
                { collaboratorId: collaborator._id },//query
                '',//fields
                // { path:'collaboratorId', select:'-passwd' }//populate
            )
            
            if(oldCollaboratorService){ services = oldCollaboratorService.serviceId }
            
            listCollaborador.push({
                ...collaborator._doc,
                services,
            })
        }
    }

    return { 
        error:false, 
        message:'Colaborador(es) encontrado.', 
        // collaborators: listCollaborador.map((salCol)=>({
        //     ...salCol.collaboratorId._doc,
        //     salonCollaboratorId: salCol._id,
        //     status: salCol.status,
        //     services: salCol.services,
        //     dateRegistration: salCol.dateRegistration
        // }))
        collaborators: listCollaborador
    }
}

/*** API Pagar.me ***
 * 
 * @param {*} salonId 
 * @param {*} collaboratorCandidate 
 * @returns 
 */
const post = async ( salonId, collaboratorCandidate, services=[] )=>{    
    console.log('CollaboratorService::post Pagar.me' )
    const db = mongoose.connection
    const session = await db.startSession()
    session.startTransaction()

    //BUSCAR COLABORADOR:
    const { oldCollaborator } = await CollaboratorRepository.findOne({
        $or:[ 
            { email: collaboratorCandidate.email },
            { phone: collaboratorCandidate.phone }
        ]
    })
    if( oldCollaborator ){   return{ error:true, message:'Colaborador já cadastrado.' }   }
    
    //CRIAR CONTA Pagar.me:
    const { bankAccount }  = collaboratorCandidate
    const pagarmeRecipient = await createAccountPagarme(bankAccount)
    // if( pagarmeRecipient.error ){ return{ error:true, message:'Erro ao cadastrar no Pagar.me.' }}

    //NOVO COLABORADOR:
    const { newCollaborator } = await CollaboratorRepository.save({
        ...collaboratorCandidate,
        recipientId: pagarmeRecipient.id || '0'
    })
    
    //BUSCAR RELACIONAMENTO NO DB:
    //....

    //CRIAR RELACIONAMENTO: 
    await SalonCollaboratorRepository.save({
        salonId,
        collaboratorId: newCollaborator.id,
        status: collaboratorCandidate.status
    })
    
    if( isEmpty(services) ){ return { error:false, message:'Colaborador cadastro sem serviços.', collaborator:newCollaborator } }
    //BUSCAR RELACIONAMENTO NO DB:
    // ...

    //CRIAR RELACIONAMENTO: 
    await CollaboratorServiceRepository.insertMany(
        services.map((serviceId)=>({ 
            serviceId, 
            collaboratorId:newCollaborator.id 
        }))
        //,{ session }
    )

    await session.commitTransaction()
    session.endSession()

    return { error:false, message:'Cadastrado com sucesso.', collaborator:newCollaborator }

}

/*** AULA ***
 * 
 * @param {*} collaboratorId 
 * @param {*} bond 
 * @param {*} bondId salonId
 * @param {*} services 
 * @returns 
 */
const put = async ( collaboratorId, status, salColId , services )=>{
    console.log('CollaboratorService::put', collaboratorId, salColId, status, services)
    const db = mongoose.connection
    const session = await db.startSession()
    session.startTransaction()

    //BUSCAR COLABORADOR:
    const { oldCollaborator } = await CollaboratorRepository.findOne({_id: collaboratorId})
    if( !oldCollaborator ){ return{ error:true, message:'Colaborador não existe.' } }
    
    //ATUALIZA RELACIONAMENTO: (UPDATE STATUS)
    await SalonCollaboratorRepository.findByIdAndUpdate(salColId, { status })

    //DELETAR RELACIONAMENTO: (DEL SERVICES)
    const { delCollaboratorServices } = await CollaboratorServiceRepository.deleteMany({collaboratorId})
    console.log('delCollaboratorServices', delCollaboratorServices)

    //INSERIR RELACIONAMENTO: (INSERT SERVICES) 
    await CollaboratorServiceRepository.insertMany(
        services.map((serviceId)=>({ serviceId, collaboratorId }))
    )

    await session.commitTransaction()
    session.endSession()

    return { error: true, message: 'Atualizado com sucesso.' }
 }

/** AULA **/
const deleteById = async (id) => {
    console.log('CollaboratorService::deleteById')
    //BUSCAR RELACIONAMENTO:
    const { upSalonCollaborator } = await SalonCollaboratorRepository.findByIdAndUpdate(id,{status:'e'})
    if( !upSalonCollaborator ){ return { error: true, message: 'Erro ao deletar.' } }
    
    return { error: true, message: 'Deletado com sucesso.' }
}


const filters = async (filters={}) => {
    console.log('CollaboratorService::filters')
    return CollaboratorRepository.filters(filters)
}

module.exports = {

    get,
    // getById,
    getSalonCollaborators,
    post,
    put,
    deleteById,
    filters,

}