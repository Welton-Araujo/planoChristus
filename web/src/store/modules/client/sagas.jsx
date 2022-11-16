import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import { ALL_CLIENT, FILTER_CLIENTS } from '../../../constants/store/actionTypes'
import { updateClient } from './actions'

import api   from '../../../utils/external/api' 
import clientTest from '../../../data/fakeReq/clientTest.json'

const endPointClients = `/cliente/salao/${clientTest.get.salonId}`
const endPointFilters = `/cliente/filters`


export function* allClient(){
    // console.log('allClient', )
        
    //BUSCAR STATE.CLIENT: PAYLOAD, FORM, ...
    const { form } = yield select(state=>state.client) 
    // console.log('SAGAS STATE #######', form)

    try {

        //ATUALIZAR FORM: TRUE:
        yield put(updateClient({form:{...form, filtering: true}}))

        //REQUEST CLIENTES PARA API:
        const { data } = yield call(api.get, endPointClients)
        
        //ATUALIZAR FORM: FALSE:
        yield put(updateClient({ form:{...form, filtering: false}}))

        // console.log('allClient ...',data)
        if( data.error ){
            alert('SAGA CLIENT erro ... ' + data.message)
            return false
        }

        //ATUALIZAR CLIENTS: (ORIUNDOS API)
        yield put(updateClient({ clients:data.clients }))

    } catch (error) {
        alert('SAGA CLIENT erro ... ' + error)
        yield put(updateClient({ form:{...form, filterring: false} }))
    }
}

export function* filterClients(){
    // console.log('allClient', )
        
    //BUSCAR STATE.CLIENT: PAYLOAD, FORM, ...
    const { client, form } = yield select(state=>state.client) 
    // console.log('SAGAS STATE #######', client, form )

    try {

        //ATUALIZAR FORM: TRUE:
        yield put(updateClient({form:{...form, filtering: true}}))

        //REQUEST CLIENTES PARA API:
        const { data } = yield call(api.post, endPointFilters,{email: client && client.email})
        
        //ATUALIZAR FORM: FALSE:
        yield put(updateClient({ form:{...form, filtering: false}}))

        // console.log('allClient ...',data)
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
        yield put(updateClient({ form:{...form, filterring: false} }))
    }
}

export default all([
    takeLatest(ALL_CLIENT, allClient),
    takeLatest(FILTER_CLIENTS, filterClients)
])