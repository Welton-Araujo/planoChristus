import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import { 
    // API
    ALL_CLIENT, 
    ADD_CLIENT,
    FILTER_CLIENT,
    UPDATE_CLIENT,
    UNLINK_CLIENT,

    // STATE LOCAL
} from '../../../constants/store/actionTypes'
import { 
    allClient as allClientAction,
    refreshClient,
    resetClient,
} from './actions'

import api   from '../../../utils/external/api' 

// TESTE STATIC
import login from '../../../data/fakeReq/login.json'
import clientTest from '../../../data/fakeReq/clientTest.json'


/**
 * @Info Busca os cliente do salao logado.
 *       Get Relationship:SalonClient.
 * @returns 
 */
export function* allClient(){
    
    //BUSCAR STATE.CLIENT:
    const { form } = yield select(state=>state.client) 
    const endPointAll=`/cliente/salao/${login.salon._id}`
    console.log('SAGAS::allClient:', endPointAll)

    try {
        //ATUALIZAR FORM: loading
        yield put(refreshClient({ form:{ ...form, filtering:true } }))

        //REQUEST CLIENTES PARA API:
        const { data } = yield call(api.get, endPointAll)
        
        //ATUALIZAR FORM: loading
        yield put(refreshClient({ form:{ ...form, filtering:false } }))

        console.log('SAGAS allClient ...',data)
        if( data.error ){
            alert('SAGAS allClient erro ... ' + data.message)
            return false
        }

        //ATUALIZAR CLIENTS: (ORIUNDOS API)
        yield put(refreshClient({ all:data.clients }))

    } catch (error) {
        alert('SAGA allClient erro ... ' + error)
        yield put(refreshClient({ form:{ ...form, filterring:false } }))
    }
}

/**
 * @Info Criar client e o relacionamento com um salao.
 *       Post Model:Client, Relationship:SalonClient
 * @return
 */
export function* addClient(){    
    //BUSCAR STATE.CLIENT:
    const { current, form, components } = yield select(state=>state.client) 
    const endPointAdd = `/cliente`
    // console.log('SAGAS::addClient::', endPointAdd, current)

    try {
        //ATUALIZAR FORM: loading:
        yield put(refreshClient({ form:{ ...form, saving:true } }))

        //REQUEST CLIENTES PARA API:
        const { data } = yield call(api.post, endPointAdd,{
            salonId: login.salon._id,
            client: current
        })
        
        //ATUALIZAR FORM: loading:
        yield put(refreshClient({ form:{ ...form, saving:false } }))

        // console.log('SAGAS addClients ...',data)
        if( data.error ){
            alert('SAGA addClient erro ... ' + data.message)
            return false
        }
        
        //RECARREGAR A TABLE:
        yield put(allClientAction())
        //FECHAR O COMPONENTE:
        yield put(refreshClient({ components:{ ...components, drawer:{ id:null, open:false } } }))
        //LIMPAR FORM:
        yield put(resetClient())

    } catch (error) {
        alert('SAGA addClient erro ... ' + error)
        yield put(refreshClient({ form:{ ...form, saving:false } }))
    }
}

/**
 * @Info Busca um cliente do salao logado.
 *       Post Model:Client ou Get Model:Client
 * @returns 
 */
export function* filterClient(){
    //BUSCAR STATE.CLIENT:
    const { current, form } = yield select(state=>state.client) 
    const endPointFilter = `/cliente/filtro`//?email=${current.email}&status=a
    console.log('SAGAS::filterClients: ###', endPointFilter, current, form )

    try {
        //ATUALIZAR FORM: loading
        yield put(refreshClient({ form:{ ...form, filtering:true }}))

        //REQUEST CLIENTES PARA API:
        const { data } = yield call(api.post, endPointFilter,{
            email: current.email,
            status: "a"
        })
        
        //ATUALIZAR FORM: loading
        yield put(refreshClient({ form:{ ...form, filtering:false }}))

        console.log('SAGAS::filterClients ...',data)
        if( data.error ){
            alert('SAGA filterClient erro ... ' + data.message)
            return false
        }
        
        //ATUALIZAR STATE:
        if(data.clients.length > 0){
            yield put(refreshClient({ 
                current: data.clients[0],//PRIMEIRO
                form:{ ...form, filtering:false, disabled:true } 
            }))
        }else{
            //LIBERTAR OS CAMPOS DO FORM: clients:[empty]
            yield put(refreshClient({ form:{ ...form, disabled:false } }))
        }

    } catch (error) {
        alert('SAGA filterClient erro ... ' + error)
        yield put(refreshClient({ form:{ ...form, filterring:false } }))
    }
}

/**
 * @Info Atualiza cliente do salao logado.
 *       Put Relationship:SalonClient.
 * @returns 
 */
export function* updateClient(){        
    //BUSCAR STATE.CLIENT:
    const { current, form, components } = yield select(state=>state.client)
    const { salonClient={} } = current
    const clientServices     = clientTest.put.services
    const endPointUpdate     = `/cliente/${current.id}`
    console.log('SAGAS::updateClient:', endPointUpdate, current )

    try {
        //ATUALIZAR FORM: loading:
        yield put(refreshClient({ form:{ ...form, saving:true } }))

        //REQUEST CLIENTES PARA API:
        const { data } = yield call(api.put, endPointUpdate,{
            bondId: salonClient.salonClientId,
            status: salonClient.status,
            services: clientServices
        })
        
        //ATUALIZAR FORM: loading:
        yield put(refreshClient({ form:{ ...form, saving:false } }))

        console.log('SAGAS updateClient ...',data)
        if( data.error ){
            alert('SAGA updateClient erro ... ' + data.message)
            return false
        }
        
        //RECARREGAR A TABLE:
        yield put(allClientAction())
        //FECHAR O COMPONENTE:
        yield put(refreshClient({ components:{ ...components, drawer:{ id:null, open:false } } }))
        //LIMPAR FORM:
        yield put(resetClient())

    } catch (error) {
        alert('SAGA updateClient erro ... ' + error)
        yield put(refreshClient({ form:{ ...form, saving:false } }))
    }
}

/**
 * @Info Pseudo delete de cliente do salao logado.
 *       Delete Relationship:SalonClient
 * @returns 
 */

export function* unlinkClient(){
    //BUSCAR STATE.CLIENT:
    const { all, current, form, components } = yield select(state=>state.client)
    const { salonClient={} } = current
    const endPointUnlink = `/cliente/servico/${salonClient.salonClientId}`
    console.log('SAGAS::unlinkClient', endPointUnlink, current)

    try {
        //ATUALIZAR FORM: loading
        yield put(refreshClient({ form:{ ...form, saving:true } }))

        //REQUEST CLIENTES PARA API:
        const { data } = yield call(api.delete, endPointUnlink)
        
        //ATUALIZAR FORM: loading
        yield put(refreshClient({ form:{ ...form, saving:false } }))

        console.log('SAGAS unlinkClient ...',data)
        if( data.error ){
            alert('SAGA unlinkClient erro ... ' + data.message)
            return false
        }
        
        //RECARREGAR A TABLE:
        yield put(allClientAction())
        //FECHAR O COMPONENTE:
        yield put(refreshClient({
            // all:data.clients,
            components:{ ...components, drawer:{ id:null, open:false }, modal:{ id:null, open:false } } 
        }))
        //LIMPAR FORM:
        // yield put(resetClient())

    } catch (error) {
        alert('SAGA unlinkClient erro ... ' + error)
        yield put(refreshClient({ form:{ ...form, saving:false } }))
    }
}


export default all([
    takeLatest(ALL_CLIENT, allClient),
    takeLatest(ADD_CLIENT, addClient),
    takeLatest(FILTER_CLIENT, filterClient),
    takeLatest(UPDATE_CLIENT, updateClient),
    takeLatest(UNLINK_CLIENT , unlinkClient),
])