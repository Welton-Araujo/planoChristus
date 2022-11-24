const { distance:geoDistance }  = require('../../utils/calculations/geoLocation')
const { isFilled, isEmpty } = require('../../utils/validations')

const SalonRepository = require('../repositories/salon.repository')
const ServiceRepository = require('../repositories/service.repository')


/*** AULA *** 
 * 
 * @param {*} query Obj { field, ... }
 * @param {*} fields String 'fields ...'
 * @returns 
 */
const get = async (query={}, fields='')=>{
    console.log('SalonService::', query, fields)    
    return SalonRepository.find(query, fields)
}

/**
 * 
 * @param {*} id 
 * @param {*} coordinates [latitude, longitude]
 * @param {*} query noSQL .find(query)
 * @param {*} fields noSQL .select(fields)
 * @returns sucess {error, salon, distance}
 * @returns error {error, message}
 */
const getById = async (id="", coordinates=[], fields='_id name address.city')=>{
    console.log('SalonService::getById', id, coordinates, fields)
    
    //BUSCAR SALAO:
    const { salon } = await SalonRepository.findById(id, fields)
    if( !salon ) return { error:true, message:'Salão não encontrado'}
    if( coordinates.includes(undefined) ) return { error:true, message:'Coordenadas inválidas'}

    let distance = null
    //DISTANCIA: SE GEO EXISTIR, CALCULAR:
    if( salon.geo ){  distance = geoDistance(salon.geo.coordinates, coordinates)  }

    return { erros:false, salon, distance }
}

/*** AULA ***/
const post = async (newSalon)=>{
    console.log('SalonService::post')
    //Validar a geo do formulario!
    return SalonRepository.save(newSalon)
}

const put = async (id, salon)=>{
    console.log('SalonService::put', id, salon)    
    return SalonRepository.findByIdAndUpdate(id, salon)
}

const deleteById = async ( id, email, passwd )=>{
    console.log('SalonService::del', id, email)

    //BUSCAR SALAO:
    const { salon } = await SalonRepository.findById(id, 'email passwd')
    if( !salon ) return { error:true, message:'Salão não encontrado.', salon }
    
    //SE LOGIN_OK, EXCLUIR DO DB:
    if( salon.email==email && salon.passwd==passwd ){
        const { oldSalon } = await SalonRepository.deleteById(id, '_id name')

        //SUCESSO NA EXLUSAO:
        if( oldSalon ) return { error:false, delete:true, message:'Salão excluído.', salon:oldSalon }
    }
    return { error:true, delete:false, message:'Erro na exclusão. Verifique seus dados.', salon:null }
}

/*** AULA ***
 * @Service obter serviços do salao.
 */
const getSalonFormattedServices = async (salonId, query={}, fields='_id title') => {
    console.log('SalonService::getSalonFormattedServices', salonId, query, fields)
    //BUSCAR SERVIÇOS:
    let { error, services } = await ServiceRepository.find({ 
        salonId, 
        status: 'a',
        ...query
    }, fields)

    if( isEmpty(services) ) return { error:true, message:'Erro, o serviço não existe.', services}

    //FORMATO DO FRONT: [{ label: 'Serviço', value: '1122334455' }] 
    services = services.map((s)=>({ label: s.title, value: s._id }))
    
    return { error, salonId, services }    
}


module.exports = {
    
    get,
    getById,
    post,
    put,
    deleteById,
    getSalonFormattedServices,

}