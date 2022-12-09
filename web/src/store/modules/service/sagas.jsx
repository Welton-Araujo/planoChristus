import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import { 
    // API
    ALL_SERVICE, 
    ADD_SERVICE,
    // FILTER_SERVICE,
    UPDATE_SERVICE,
    UNLINK_SERVICE,
    DELETEFILE_SERVICE,
    // STATE LOCAL

} from '../../../constants/store/actionTypes'
import { 
    allService as allServiceAction,
    refreshService,
    resetService,
} from './actions'

import api   from '../../../utils/external/api' 

// TESTE STATIC
import login from '../../../data/fakeReq/login.json'
// import collaboratorTest from '../../../data/fakeReq/collaboratorTest.json'


/**
 * @Info Busca os service do salao logado.
 *       Get Relationship:SalonService.
 * @returns 
 */
export function* allService(){    
    //BUSCAR STATE.SERVICE:
    const { form } = yield select(state=>state.collaborator) 
    const endPointAll=`/servico/salao/${login.salon._id}`
    console.log('SAGAS::allService:', endPointAll)

    try {
        //ATUALIZAR FORM: loading
        yield put(refreshService({ form:{ ...form, filtering:true } }))

        //REQUEST SERVICEES PARA API:
        const { data } = yield call(api.get, endPointAll)
        
        //ATUALIZAR FORM: loading
        yield put(refreshService({ form:{ ...form, filtering:false } }))

        console.log('SAGAS allService ...',data)
        if( data.error ){
            alert('SAGAS SERVICE erro ... ' + data.message)
            return false
        }

        //ATUALIZAR SERVICES: (ORIUNDOS API)
        yield put(refreshService({ all:data.services }))

    } catch (error) {
        alert('SAGA SERVICE erro ... ' + error)
        yield put(refreshService({ form:{ ...form, filterring:false } }))
    }
}

/**
 * @Info Criar client e o relacionamento com um salao.
 *       Post Model:Service, Relationship:SalonService
 * @return
 */
export function* addService(){    
    //BUSCAR STATE.SERVICE:
    const { current, form, components } = yield select(state=>state.collaborator) 
    const { files=[] } = current
    const endPointAdd = `/servico`
    // console.log('SAGAS::addService::', endPointAdd, current)

    try {
        //ATUALIZAR FORM: loading:
        yield put(refreshService({ form:{ ...form, saving:true } }))

        //REQUEST SERVICES PARA API:
        const _files = { }
        files.forEach((file, i)=>{
            return _files[`file_0%{i}`] = file.path
        })
        const { data } = yield call(api.post, endPointAdd, {
            service: {
                salonId: login.salon._id,
                current
            },
            ..._files
        })
        
        //ATUALIZAR FORM: loading:
        yield put(refreshService({ form:{ ...form, saving:false } }))

        // console.log('SAGAS addServices ...',data)
        if( data.error ){
            alert('SAGA SERVICE erro ... ' + data.message)
            return false
        }
        
        //RECARREGAR A TABLE:
        yield put(allServiceAction())
        //FECHAR O COMPONENTE:
        yield put(refreshService({ components:{ ...components, drawer:{ id:null, open:false } } }))
        //LIMPAR FORM:
        yield put(resetService())

    } catch (error) {
        alert('SAGA SERVICE erro ... ' + error)
        yield put(refreshService({ form:{ ...form, saving:false } }))
    }
}

/**
 * @Info Atualiza service do salao logado.
 *       Put Relationship:SalonService.
 * @returns 
 */
export function* updateService(){        
    //BUSCAR STATE.SERVICE:
    const { current, form, components } = yield select(state=>state.collaborator)
    const { services=[], salonService={} } = current
    const endPointUpdate       = `/colaborador/${current.id}`
    // console.log('SAGAS::updateService:', endPointUpdate, current )

    try {
        //ATUALIZAR FORM: loading:
        yield put(refreshService({ form:{ ...form, saving:true } }))

        //REQUEST SERVICEES PARA API:
        const { data } = yield call(api.put, endPointUpdate,{
            bondId: salonService.id,
            status: salonService.status,
            services,
        })
        
        //ATUALIZAR FORM: loading:
        yield put(refreshService({ form:{ ...form, saving:false } }))

        console.log('SAGAS updateService ...',data)
        if( data.error ){
            alert('SAGA SERVICE erro ... ' + data.message)
            return false
        }
        
        //RECARREGAR A TABLE:
        yield put(allServiceAction())
        //FECHAR O COMPONENTE:
        yield put(refreshService({ components:{ ...components, drawer:{ id:null, open:false } } }))
        //LIMPAR FORM:
        yield put(resetService())

    } catch (error) {
        alert('SAGA SERVICE erro ... ' + error)
        yield put(refreshService({ form:{ ...form, saving:false } }))
    }
}

/**
 * @Info Pseudo delete de service do salao logado.
 *       Delete Relationship:SalonService
 * @returns 
 */

export function* unlinkService(){
    //BUSCAR STATE.SERVICE:
    const { current, form, components } = yield select(state=>state.collaborator)
    const { salonService={} } = current
    const endPointUnlink = `/colaborador/servico/${salonService.id}`
    console.log('SAGAS::unlinkService', endPointUnlink, current)

    try {
        //ATUALIZAR FORM: loading
        yield put(refreshService({ form:{ ...form, saving:true } }))

        //REQUEST SERVICEES PARA API:
        const { data } = yield call(api.delete, endPointUnlink)
        
        //ATUALIZAR FORM: loading
        yield put(refreshService({ form:{ ...form, saving:false } }))

        console.log('SAGAS unlinkService ... DATA',data)
        if( data.error ){
            alert('SAGA SERVICE erro ... ' + data.message)
            return false
        }
        
        //RECARREGAR A TABLE:
        yield put(allServiceAction())
        //FECHAR O COMPONENTE:
        yield put(refreshService({ components:{ ...components, modal:{ id:null, open:false } } }))
        console.log('SAGAS::refreshService: components', components)
        //LIMPAR FORM:
        yield put(resetService())

    } catch (error) {
        alert('SAGA SERVICE erro ... ' + error)
        yield put(refreshService({ form:{ ...form, saving:false } }))
    }
}

/**
 * @Info Delete de Arquivo do service do salao logado.
 *       Delete Model:FileService
 * @returns 
 */

export function* deleteFileService(){
    //BUSCAR STATE.SERVICE:
    const { current, form, components } = yield select(state=>state.collaborator)
    const { salonService={} } = current
    const endPointUnlink = `/colaborador/servico/${salonService.id}`
    console.log('SAGAS::unlinkService', endPointUnlink, current)

    try {
        //ATUALIZAR FORM: loading
        yield put(refreshService({ form:{ ...form, saving:true } }))

        //REQUEST SERVICEES PARA API:
        const { data } = yield call(api.delete, endPointUnlink)
        
        //ATUALIZAR FORM: loading
        yield put(refreshService({ form:{ ...form, saving:false } }))

        console.log('SAGAS unlinkService ... DATA',data)
        if( data.error ){
            alert('SAGA SERVICE erro ... ' + data.message)
            return false
        }
        
        //RECARREGAR A TABLE:
        yield put(allServiceAction())
        //FECHAR O COMPONENTE:
        yield put(refreshService({ components:{ ...components, modal:{ id:null, open:false } } }))
        console.log('SAGAS::refreshService: components', components)
        //LIMPAR FORM:
        yield put(resetService())

    } catch (error) {
        alert('SAGA SERVICE erro ... ' + error)
        yield put(refreshService({ form:{ ...form, saving:false } }))
    }
}


export default all([
    takeLatest(ALL_SERVICE, allService),
    takeLatest(ADD_SERVICE, addService),
    takeLatest(UPDATE_SERVICE, updateService),
    takeLatest(UNLINK_SERVICE , unlinkService),
    takeLatest(DELETEFILE_SERVICE , deleteFileService),
])