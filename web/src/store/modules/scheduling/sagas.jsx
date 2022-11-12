import { all, takeLatest, call, put } from 'redux-saga/effects'

import { SCHEDULING_FILTER } from '../actionTypes'
import { updateScheduling } from './actions'

import api   from '../../../utils/external/api' 
import login from '../../../data/loginTest.json'

const endPoint = '/agendamento/filters'


export function* filterScheduling ({ start, end }){
    try {
        const { data } = yield call(api.post, endPoint, {
            salonId:  login.salonId,
            period:{
                start,
                end
            }
        })
        // console.log('filterScheduling ...',data)
        if( data.error ){
            alert('Saga erro ... ' + data.message)
            return false
        }

        //DISPARAR ACTION:
        yield put(updateScheduling(data.schedules))

    } catch (error) {
        alert('Saga erro ... ' + error)
    }
}

export default all([takeLatest(SCHEDULING_FILTER, filterScheduling)])