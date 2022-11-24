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
    const endPointAll=`/cliente/salao/${login.salon._id}`
    console.log('SAGAS::allClient::API.get', endPointAll)
        
    //BUSCAR STATE.CLIENT:
    const { form } = yield select(state=>state.client) 
    // console.log('SAGAS STATE #######', form)

    try {
        //ATUALIZAR FORM: loading
        yield put(refreshClient({ form:{ ...form, filtering:true } }))

        //REQUEST CLIENTES PARA API:
        const { data } = yield call(api.get, endPointAll)
        
        //ATUALIZAR FORM: loading
        yield put(refreshClient({ form:{ ...form, filtering:false } }))

        console.log('SAGAS allClient ...',data)
        if( data.error ){
            alert('SAGAS CLIENT erro ... ' + data.message)
            return false
        }

        //ATUALIZAR CLIENTS: (ORIUNDOS API)
        yield put(refreshClient({ all:data.clients }))

    } catch (error) {
        alert('SAGA CLIENT erro ... ' + error)
        yield put(refreshClient({ form:{ ...form, filterring:false } }))
    }
}

/**
 * @Info Criar client e o relacionamento com um salao.
 *       Post Model Client, Relationship:SalonClient
 * @return
 */
export function* addClient(){
    const endPointAdd = `/cliente`
    // console.log('SAGAS addClients', )
        
    //BUSCAR STATE.CLIENT:
    const { current, form, components } = yield select(state=>state.client) 
    // console.log('SAGAS STATE #######', current, form )

    try {
        //ATUALIZAR FORM: loading:
        yield put(refreshClient({ form:{ ...form, saving:true } }))

        //REQUEST CLIENTES PARA API:
        const { data } = yield call(api.post, endPointAdd,{
            salonId: clientTest.get.salonId,
            client: current
        })
        
        //ATUALIZAR FORM: loading:
        yield put(refreshClient({ form:{ ...form, saving:false } }))

        // console.log('SAGAS addClients ...',data)
        if( data.error ){
            alert('SAGA CLIENT erro ... ' + data.message)
            return false
        }
        
        //RECARREGAR A TABLE:
        yield put(allClientAction())
        //FECHAR O COMPONENTE:
        yield put(refreshClient({ components:{ ...components, drawer:{ id:null, open:false } } }))
        //LIMPAR FORM:
        yield put(resetClient())

    } catch (error) {
        alert('SAGA CLIENT erro ... ' + error)
        yield put(refreshClient({ form:{ ...form, saving:false } }))
    }
}

/**
 * @Info Busca um cliente do salao logado.
 *       Post Model Client ou Get Client
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
            alert('SAGA CLIENT erro ... ' + data.message)
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
        alert('SAGA CLIENT erro ... ' + error)
        yield put(refreshClient({ form:{ ...form, filterring:false } }))
    }
}

/**
 * @Info Atualiza cliente do salao logado.
 *       Put Telationship:SalonClient.
 * @returns 
 */
export function* updateClient(){        
    //BUSCAR STATE.CLIENT:
    const { current, form, components } = yield select(state=>state.client) 
    const endPointUpdate = `/cliente/${current.Id}`
    console.log('SAGAS STATE #######', endPointUpdate, current, form )

    try {
        //ATUALIZAR FORM: loading:
        yield put(refreshClient({ form:{ ...form, saving:true } }))

        //REQUEST CLIENTES PARA API:
        const { data } = yield call(api.put, endPointUpdate,{
            bondId: clientTest.put.bondId,
            status: clientTest.put.status,
            services: clientTest.put.services            
        })
        
        //ATUALIZAR FORM: loading:
        yield put(refreshClient({ form:{ ...form, saving:false } }))

        console.log('SAGAS updateClient ...',data)
        if( data.error ){
            alert('SAGA CLIENT erro ... ' + data.message)
            return false
        }
        
        //RECARREGAR A TABLE:
        yield put(allClientAction())
        //FECHAR O COMPONENTE:
        yield put(refreshClient({ components:{ ...components, drawer:{ id:null, open:false } } }))
        //LIMPAR FORM:
        yield put(resetClient())

    } catch (error) {
        alert('SAGA CLIENT erro ... ' + error)
        yield put(refreshClient({ form:{ ...form, saving:false } }))
    }
}

/**
 * @Info Pseudo delete de cliente do salao logado.
 *       Delete Relationship:SalonClient
 * @returns 
 */
export function* unlinkClient(){
    const endPointUnlink = `/cliente/servico/${clientTest.del.salonClientId}`
    // console.log('SAGAS unlinkClient', )
        
    //BUSCAR STATE.CLIENT:
    const { form, components } = yield select(state=>state.client) 
    // console.log('SAGAS STATE #######', form )

    try {
        //ATUALIZAR FORM: loading
        yield put(refreshClient({ form:{ ...form, saving:true } }))

        //REQUEST CLIENTES PARA API:
        const { data } = yield call(api.delete, endPointUnlink)
        
        //ATUALIZAR FORM: loading
        yield put(refreshClient({ form:{ ...form, saving:false } }))

        console.log('SAGAS unlinkClient ...',data)
        if( data.error ){
            alert('SAGA CLIENT erro ... ' + data.message)
            return false
        }
        
        //RECARREGAR A TABLE:
        yield put(allClientAction())
        //FECHAR O COMPONENTE:
        yield put(refreshClient({ components:{ ...components, drawer:{ id:null, open:false }, modal:{ id:null, open:false } } }))
        //LIMPAR FORM:
        yield put(resetClient())

    } catch (error) {
        alert('SAGA CLIENT erro ... ' + error)
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