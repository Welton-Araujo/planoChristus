import { all, takeLatest, call, put } from 'redux-saga/effects'

import { FILTER_SCHEDULING } from '../../../constants/store/actionTypes'
import { updateScheduling } from './actions'

import api   from '../../../utils/external/api' 
import login from '../../../data/fakeReq/login.json'


export function* filterScheduling ({ payload:{ start, end } }){
    const endPoint = '/agendamento/filters'
    console.log('filterScheduling sagas', start, end )
    try {
        const { data } = yield call(api.post, endPoint, {
            salonId:  login.salon._id,
            period:{
                start,
                end
            }
        })
        console.log('filterScheduling ...',data)
        if( data.error ){
            alert('Saga erro ... ' + data.message)
            return false
        }

        //DISPARAR ACTION:
        yield put(updateScheduling({ all:data.schedules }))

    } catch (error) {
        alert('Saga erro ... ' + error)
    }
}

export default all([takeLatest(FILTER_SCHEDULING, filterScheduling)])