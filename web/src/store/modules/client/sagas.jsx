import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import { 
    ALL_CLIENT, 
    ADD_CLIENT,
    FILTER_CLIENTS,
} from '../../../constants/store/actionTypes'
import { 
    allClient as allClientAction,
    updateClient,
    resetClient,
} from './actions'

import api   from '../../../utils/external/api' 
import clientTest from '../../../data/fakeReq/clientTest.json'

const endPointClients = `/cliente/salao/${clientTest.get.salonId}`
const endPointFilters = `/cliente/filtro`
const endPointAdd     = `/cliente`

export function* allClient(){
    // console.log('allClient', )
        
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

        // console.log('allClient ...',data)
        if( data.error ){
            alert('SAGA CLIENT erro ... ' + data.message)
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
    // console.log('addClients', )
        
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

        // console.log('addClients ...',data)
        if( data.error ){
            alert('SAGA CLIENT erro ... ' + data.message)
            return false
        }
        
        //RECARREGAR A TABLE:
        yield put(allClientAction())
        //FECHAR O COMPONENTE:
        yield put(updateClient({ components:{ ...components, drawer:false } }))
        //LIMPAR FORM:
        yield put(resetClient())

    } catch (error) {
        alert('SAGA CLIENT erro ... ' + error)
        yield put(updateClient({ form:{ ...form, saving:false } }))
    }
}

export function* filterClients(){
    // console.log('filterClients', )
        
    //BUSCAR STATE.CLIENT: PAYLOAD, FORM, ...
    const { client, form } = yield select(state=>state.CLIENT) 
    // console.log('SAGAS STATE #######', client, form )

    try {

        //ATUALIZAR FORM: TRUE:
        yield put(updateClient({ form:{ ...form, filtering:true }}))

        //REQUEST CLIENTES PARA API:
        const { data } = yield call(api.post, endPointFilters,{
            email: client.email,
            status:"A"
        })
        
        //ATUALIZAR FORM: FALSE:
        yield put(updateClient({ form:{ ...form, filtering:false }}))

        // console.log('filterClients ...',data)
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


export default all([
    takeLatest(ALL_CLIENT, allClient),
    takeLatest(ADD_CLIENT, addClient),
    takeLatest(FILTER_CLIENTS, filterClients)
])