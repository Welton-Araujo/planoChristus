import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import { 
    ALL_CLIENT, 
    ADD_CLIENT,
    FILTER_CLIENTS,
    UNLINK_CLIENT,
} from '../../../constants/store/actionTypes'
import { 
    allClient as allClientAction,
    updateClient,
    resetClient,
} from './actions'

import api   from '../../../utils/external/api' 

// TESTE STATIC
import clientTest from '../../../data/fakeReq/clientTest.json'

const endPointClients = `/cliente/salao/${clientTest.get.salonId}`
const endPointFilters = `/cliente/filtro`
const endPointAdd     = `/cliente`
const endPointDelCli  = `/cliente/servico/${clientTest.del.salonClientId}`


export function* allClient(){
    // console.log('SAGAS allClient', )
        
    //BUSCAR STATE.CLIENT: PAYLOAD, FORM, ...
    const { form } = yield select(state=>state.CLIENT) 
    // console.log('SAGAS STATE #######', form)

    try {

        //ATUALIZAR FORM: TRUE:
        yield put(updateClient({ form:{ ...form, filtering:true } }))

        //REQUEST CLIENTES PARA API:
        const { data } = yield call(api.get, endPointClients)
        
        //ATUALIZAR FORM: FALSE:
        yield put(updateClient({ form:{ ...form, filtering:false } }))

        // console.log('SAGAS allClient ...',data)
        if( data.error ){
            alert('SAGAS CLIENT erro ... ' + data.message)
            return false
        }

        //ATUALIZAR CLIENTS: (ORIUNDOS API)
        yield put(updateClient({ clients:data.clients }))

    } catch (error) {
        alert('SAGA CLIENT erro ... ' + error)
        yield put(updateClient({ form:{ ...form, filterring:false } }))
    }
}

export function* addClient(){
    // console.log('SAGAS addClients', )
        
    //BUSCAR STATE.CLIENT: PAYLOAD, FORM, ...
    const { client, form, components } = yield select(state=>state.CLIENT) 
    // console.log('SAGAS STATE #######', client, form )

    try {

        //ATUALIZAR FORM: TRUE:
        yield put(updateClient({ form:{ ...form, saving:true } }))

        //REQUEST CLIENTES PARA API:
        const { data } = yield call(api.post, endPointAdd,{
            salonId: clientTest.get.salonId,
            client
        })
        
        //ATUALIZAR FORM: FALSE:
        yield put(updateClient({ form:{ ...form, saving:false } }))

        // console.log('SAGAS addClients ...',data)
        if( data.error ){
            alert('SAGA CLIENT erro ... ' + data.message)
            return false
        }
        
        //RECARREGAR A TABLE:
        yield put(allClientAction())
        //FECHAR O COMPONENTE:
        yield put(updateClient({ components:{ ...components, drawer:{ id:null, open:false } } }))
        //LIMPAR FORM:
        yield put(resetClient())

    } catch (error) {
        alert('SAGA CLIENT erro ... ' + error)
        yield put(updateClient({ form:{ ...form, saving:false } }))
    }
}

export function* filterClients(){
    // console.log('SAGAS filterClients', )
        
    //BUSCAR STATE.CLIENT: PAYLOAD, FORM, ...
    const { client, form } = yield select(state=>state.CLIENT) 
    // console.log('SAGAS STATE #######', client, form )

    try {

        //ATUALIZAR FORM: TRUE:
        yield put(updateClient({ form:{ ...form, filtering:true }}))

        //REQUEST CLIENTES PARA API:
        const { data } = yield call(api.post, endPointFilters,{
            email: client.email,
            status:"a"
        })
        
        //ATUALIZAR FORM: FALSE:
        yield put(updateClient({ form:{ ...form, filtering:false }}))

        // console.log('SAGAS filterClients ...',data)
        if( data.error ){
            alert('SAGA CLIENT erro ... ' + data.message)
            return false
        }
        
        //ATUALIZAR STATE:
        if(data.clients.length > 0){
            yield put(updateClient({ 
                client: data.clients[0],//PRIMEIRO
                form:{ ...form, filtering:false, disabled:true } 
            }))
        }else{
            //LIBERTAR OS CAMPOS DO FORM:
            yield put(updateClient({ form:{ ...form, disabled:false } }))
        }

    } catch (error) {
        alert('SAGA CLIENT erro ... ' + error)
        yield put(updateClient({ form:{ ...form, filterring:false } }))
    }
}

export function* unlinkClient(){
    console.log('SAGAS unlinkClient', )
        
    //BUSCAR STATE.CLIENT: PAYLOAD, FORM, ...
    const { form, components } = yield select(state=>state.CLIENT) 
    // console.log('SAGAS STATE #######', client, form )

    try {

        //ATUALIZAR FORM: TRUE:
        yield put(updateClient({ form:{ ...form, saving:true } }))

        //REQUEST CLIENTES PARA API:
        const { data } = yield call(api.delete, endPointDelCli)
        
        //ATUALIZAR FORM: FALSE:
        yield put(updateClient({ form:{ ...form, saving:false } }))

        console.log('SAGAS unlinkClient ...',data)
        if( data.error ){
            alert('SAGA CLIENT erro ... ' + data.message)
            return false
        }
        
        //RECARREGAR A TABLE:
        yield put(allClientAction())
        //FECHAR O COMPONENTE:
        yield put(updateClient({ components:{ ...components, drawer:{ id:null, open:false }, modal:{ id:null, open:false } } }))
        //LIMPAR FORM:
        yield put(resetClient())

    } catch (error) {
        alert('SAGA CLIENT erro ... ' + error)
        yield put(updateClient({ form:{ ...form, saving:false } }))
    }
}


export default all([
    takeLatest(ALL_CLIENT, allClient),
    takeLatest(ADD_CLIENT, addClient),
    takeLatest(FILTER_CLIENTS, filterClients),
    takeLatest(UNLINK_CLIENT , unlinkClient),
])