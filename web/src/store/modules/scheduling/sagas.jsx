import { all, takeLatest, call, put } from 'redux-saga/effects'

import { FILTER_SCHEDULING } from '../../../constants/store/actionTypes'
import { updateScheduling } from './actions'

import api   from '../../../utils/external/api' 
import login from '../../../data/fakeReq/schedulingTest.json'

const endPoint = '/agendamento/filters'


export function* filterScheduling ({ payload: { start, end } }){
    // console.log('filterScheduling sagas', start, end )
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

export default all([takeLatest(FILTER_SCHEDULING, filterScheduling)])