import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import { ALL_CLIENT } from '../actionTypes'
import { updateClient } from './actions'

import api   from '../../../utils/external/api' 
import client from '../../../data/fakeReq/clientTest.json'

const endPoint = `/cliente/salao/${client.get.salonId}`


export function* allClient(){
    // console.log('allClient', )
        
    //BUSCAR STATE.CLIENT: PAYLOAD, FORM, ...
    const { clients, client, form, components, behavior } = yield select(state=>state.client) 
    // console.log('SAGAS STATE #######', clients, form, components, behavior, client)

    try {

        //ATUALIZAR FORM: TRUE:
        yield put(updateClient({form:{...form, filtering: true}}))

        //REQUEST CLIENTES PARA API:
        const { data } = yield call(api.get, endPoint)
        
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

export default all([takeLatest(ALL_CLIENT, allClient)])