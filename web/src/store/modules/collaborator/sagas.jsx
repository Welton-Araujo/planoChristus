import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import { 
    // API
    ALL_COLLABORATOR, 
    ADD_COLLABORATOR,
    FILTER_COLLABORATOR,
    UPDATE_COLLABORATOR,
    UNLINK_COLLABORATOR,
    ALL_SERVICES_COLLAB,
    // STATE LOCAL

} from '../../../constants/store/actionTypes'
import { 
    allCollaborator as allCollaboratorAction,
    refreshCollaborator,
    resetCollaborator,
} from './actions'

import api   from '../../../utils/external/api' 

// TESTE STATIC
import login from '../../../data/fakeReq/login.json'
import collaboratorTest from '../../../data/fakeReq/collaboratorTest.json'


/**
 * @Info Busca os colaborador do salao logado.
 *       Get Relationship:SalonCollaborator.
 * @returns 
 */
export function* allCollaborator(){    
    //BUSCAR STATE.COLLABORATOR:
    const { form } = yield select(state=>state.collaborator) 
    const endPointAll=`/colaborador/salao/${login.salon._id}`
    console.log('SAGAS::allCollaborator:', endPointAll)

    try {
        //ATUALIZAR FORM: loading
        yield put(refreshCollaborator({ form:{ ...form, filtering:true } }))

        //REQUEST COLLABORATORES PARA API:
        const { data } = yield call(api.get, endPointAll)
        
        //ATUALIZAR FORM: loading
        yield put(refreshCollaborator({ form:{ ...form, filtering:false } }))

        console.log('SAGAS allCollaborator ...',data)
        if( data.error ){
            alert('SAGAS COLLABORATOR erro ... ' + data.message)
            return false
        }

        //ATUALIZAR COLLABORATORS: (ORIUNDOS API)
        yield put(refreshCollaborator({ all:data.collaborators }))

    } catch (error) {
        alert('SAGA COLLABORATOR erro ... ' + error)
        yield put(refreshCollaborator({ form:{ ...form, filterring:false } }))
    }
}

/**
 * @Info Criar client e o relacionamento com um salao.
 *       Post Model:Collaborator, Relationship:SalonCollaborator
 * @return
 */
export function* addCollaborator(){    
    //BUSCAR STATE.COLLABORATOR:
    const { current, form, components } = yield select(state=>state.collaborator) 
    const endPointAdd = `/colaborador`
    // console.log('SAGAS::addCollaborator::', endPointAdd, current)

    try {
        //ATUALIZAR FORM: loading:
        yield put(refreshCollaborator({ form:{ ...form, saving:true } }))

        //REQUEST COLLABORATORES PARA API:
        const { data } = yield call(api.post, endPointAdd,{
            salonId: login.salon._id,
            collaborator: current
        })
        
        //ATUALIZAR FORM: loading:
        yield put(refreshCollaborator({ form:{ ...form, saving:false } }))

        // console.log('SAGAS addCollaborators ...',data)
        if( data.error ){
            alert('SAGA COLLABORATOR erro ... ' + data.message)
            return false
        }
        
        //RECARREGAR A TABLE:
        yield put(allCollaboratorAction())
        //FECHAR O COMPONENTE:
        yield put(refreshCollaborator({ components:{ ...components, drawer:{ id:null, open:false } } }))
        //LIMPAR FORM:
        yield put(resetCollaborator())

    } catch (error) {
        alert('SAGA COLLABORATOR erro ... ' + error)
        yield put(refreshCollaborator({ form:{ ...form, saving:false } }))
    }
}

/**
 * @Info Busca um colaborador do salao logado.
 *       Post Model:Collaborator ou Get Model:Collaborator
 * @returns 
 */
export function* filterCollaborator(){
    //BUSCAR STATE.COLLABORATOR:
    const { current, form } = yield select(state=>state.collaborator) 
    const endPointFilter = `/colaborador/filtro`//?email=${current.email}&status=a
    console.log('SAGAS::filterCollaborators: ###', endPointFilter, current, form )

    try {
        //ATUALIZAR FORM: loading
        yield put(refreshCollaborator({ form:{ ...form, filtering:true }}))

        //REQUEST COLLABORATORES PARA API:
        const { data } = yield call(api.post, endPointFilter,{
            email: current.email,
            status: "a"
        })
        
        //ATUALIZAR FORM: loading
        yield put(refreshCollaborator({ form:{ ...form, filtering:false }}))

        console.log('SAGAS::filterCollaborators ... DATA',data)
        if( data.error ){
            alert('SAGA COLLABORATOR erro ... ' + data.message)
            return false
        }
        
        //ATUALIZAR STATE:
        if(data.collaborators.length > 0){
            yield put(refreshCollaborator({ 
                current: data.collaborators[0],//PRIMEIRO
                form:{ ...form, filtering:false, disabled:true } 
            }))
        }else{
            //LIBERTAR OS CAMPOS DO FORM: clients:[empty]
            yield put(refreshCollaborator({ form:{ ...form, disabled:false } }))
        }

    } catch (error) {
        alert('SAGA COLLABORATOR erro ... ' + error)
        yield put(refreshCollaborator({ form:{ ...form, filterring:false } }))
    }
}

/**
 * @Info Atualiza colaborador do salao logado.
 *       Put Relationship:SalonCollaborator.
 * @returns 
 */
export function* updateCollaborator(){        
    //BUSCAR STATE.COLLABORATOR:
    const { current, form, components } = yield select(state=>state.collaborator)
    const { salonClient={} } = current
    const collaboratorServices = collaboratorTest.put.services
    const endPointUpdate       = `/colaborador/${current.id}`
    console.log('SAGAS::updateCollaborator:', endPointUpdate, current )

    try {
        //ATUALIZAR FORM: loading:
        yield put(refreshCollaborator({ form:{ ...form, saving:true } }))

        //REQUEST COLLABORATORES PARA API:
        const { data } = yield call(api.put, endPointUpdate,{
            bondId: salonClient.salonClientId,
            status: salonClient.status,
            services: collaboratorServices
        })
        
        //ATUALIZAR FORM: loading:
        yield put(refreshCollaborator({ form:{ ...form, saving:false } }))

        console.log('SAGAS updateCollaborator ...',data)
        if( data.error ){
            alert('SAGA COLLABORATOR erro ... ' + data.message)
            return false
        }
        
        //RECARREGAR A TABLE:
        yield put(allCollaboratorAction())
        //FECHAR O COMPONENTE:
        yield put(refreshCollaborator({ components:{ ...components, drawer:{ id:null, open:false } } }))
        //LIMPAR FORM:
        yield put(resetCollaborator())

    } catch (error) {
        alert('SAGA COLLABORATOR erro ... ' + error)
        yield put(refreshCollaborator({ form:{ ...form, saving:false } }))
    }
}

/**
 * @Info Pseudo delete de colaborador do salao logado.
 *       Delete Relationship:SalonCollaborator
 * @returns 
 */

export function* unlinkCollaborator(){
    //BUSCAR STATE.COLLABORATOR:
    const { current, form, components } = yield select(state=>state.collaborator)
    const { salonClient={} } = current
    const endPointUnlink = `/colaborador/servico/${salonClient.salonClientId}`
    console.log('SAGAS::unlinkCollaborator', endPointUnlink, current)

    try {
        //ATUALIZAR FORM: loading
        yield put(refreshCollaborator({ form:{ ...form, saving:true } }))

        //REQUEST COLLABORATORES PARA API:
        const { data } = yield call(api.delete, endPointUnlink)
        
        //ATUALIZAR FORM: loading
        yield put(refreshCollaborator({ form:{ ...form, saving:false } }))

        console.log('SAGAS unlinkCollaborator ...',data)
        if( data.error ){
            alert('SAGA COLLABORATOR erro ... ' + data.message)
            return false
        }
        
        //RECARREGAR A TABLE:
        yield put(allCollaboratorAction())
        //FECHAR O COMPONENTE:
        yield put(refreshCollaborator({ components:{ ...components, drawer:{ id:null, open:false }, modal:{ id:null, open:false } } }))
        //LIMPAR FORM:
        yield put(resetCollaborator())

    } catch (error) {
        alert('SAGA COLLABORATOR erro ... ' + error)
        yield put(refreshCollaborator({ form:{ ...form, saving:false } }))
    }
}

/**
 * @Info Buscar todos servicos do colaborador do salao logado.
 *       Get Relationship:SalonCollaborator
 * @returns 
 */
export function* allServicesCollaborator(){
    //BUSCAR STATE.COLLABORATOR:
    const { current, form, components } = yield select(state=>state.collaborator)
    const { salonClient={} } = current
    const endPointALLService = `/salao/${login.salon._id}/serviços`
    console.log('SAGAS::allServicesCollaborator', endPointALLService, current)
    try {
        //ATUALIZAR FORM: loading
        yield put(refreshCollaborator({ form:{ ...form, filtering:true } }))

        //REQUEST COLLABORATORES PARA API:
        const { data } = yield call(api.post, endPointALLService)
        
        //ATUALIZAR FORM: loading
        yield put(refreshCollaborator({ form:{ ...form, filtering:false } }))

        console.log('SAGAS allServicesCollaborator ...',data)
        if( data.error ){
            alert('SAGA COLLABORATOR erro ... ' + data.message)
            return false
        }
        
        //RECARREGAR A TABLE:
        // yield put(allCollaboratorAction())
        //FECHAR O COMPONENTE:
        yield put(refreshCollaborator({ services: data.services, components:{ ...components, drawer:{ id:null, open:false }, modal:{ id:null, open:false } } }))
        //LIMPAR FORM:
        // yield put(resetCollaborator())

    } catch (error) {
        alert('SAGA COLLABORATOR erro ... ' + error)
        yield put(refreshCollaborator({ form:{ ...form, filtering:false } }))
    }
}

export default all([
    takeLatest(ALL_COLLABORATOR, allCollaborator),
    takeLatest(ADD_COLLABORATOR, addCollaborator),
    takeLatest(FILTER_COLLABORATOR, filterCollaborator),
    takeLatest(UPDATE_COLLABORATOR, updateCollaborator),
    takeLatest(UNLINK_COLLABORATOR , unlinkCollaborator),
    takeLatest(ALL_SERVICES_COLLAB , allServicesCollaborator),
])