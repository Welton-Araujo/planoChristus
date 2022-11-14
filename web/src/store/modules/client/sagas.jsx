import { all, takeLatest, call, put } from 'redux-saga/effects'

import { CLIENT_ALL } from '../actionTypes'
import { updateClient } from './actions'

import api   from '../../../utils/external/api' 
import client from '../../../data/fakeReq/clientTest.json'

const endPoint = `/cliente/salao/${client.get.salonId}`


export function* allClient(){
    // console.log('allClient', )
    try {
        const { data } = yield call(api.get, endPoint)

        // console.log('allClient ...',data)
        if( data.error ){
            alert('Saga erro ... ' + data.message)
            return false
        }

        //DISPARAR ACTION:
        yield put(updateClient( data.clients ))

    } catch (error) {
        alert('Saga erro ... ' + error)
    }
}

export default all([takeLatest(CLIENT_ALL, allClient)])