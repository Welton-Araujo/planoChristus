import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import { ALL_CLIENT } from '../actionTypes'
import { updateClient } from './actions'

import api   from '../../../utils/external/api' 
import client from '../../../data/fakeReq/clientTest.json'

const endPoint = `/cliente/salao/${client.get.salonId}`


export function* allClient(){
    // console.log('allClient', )
        
    //BUSCAR STATE.CLIENT: PAYLOAD, FORM, ...
    const { payload, form, components, behavior, client } = yield select(state=>state.client) 
    console.log('SAGAS STATE #######', payload, form)
    
    try {

        //ATUALIZAR FORM: TRUE:
        yield put(updateClient({ payload, form:{...form, filtering: true}, components, behavior, client}))

        //REQUEST CLIENTES PARA API:
        const { data } = yield call(api.get, endPoint)
        
        //ATUALIZAR FORM: FALSE:
        yield put(updateClient({ payload, form:{...form, filtering: false}}, components, behavior, client))

        // console.log('allClient ...',data)
        if( data.error ){
            alert('SAGA CLIENT erro ... ' + data.message)
            return false
        }

        //ATUALIZAR CLIENTS: (ORIUNDOS API)
        yield put(updateClient({ payload:data.clients, form, components, behavior, client }))

    } catch (error) {
        alert('SAGA CLIENT erro ... ' + error)
        yield put(updateClient({ payload, form:{...form, filterring: false}, components, behavior, client}))
    }
}

export default all([takeLatest(ALL_CLIENT, allClient)])