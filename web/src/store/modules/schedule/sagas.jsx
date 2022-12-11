import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import { 
    // API
    ALL_SCHEDULE, 
    ADD_SCHEDULE,
    FILTER_SCHEDULE,
    UPDATE_SCHEDULE,
    UNLINK_SCHEDULE,
    ALLSERVICES_SCHEDULE,
    // STATE LOCAL

} from '../../../constants/store/actionTypes'
import { 
    allSchedule as allScheduleAction,
    refreshSchedule,
    resetSchedule,
} from './actions'

import api   from '../../../utils/external/api' 

// TESTE STATIC
import login from '../../../data/fakeReq/login.json'
// import scheduleTest from '../../../data/fakeReq/scheduleTest.json'


/**
 * @Info Busca os horario do salao logado.
 *       Get Relationship:SalonSchedule.
 * @returns 
 */
export function* allSchedule(){    
    //BUSCAR STATE.SCHEDULE:
    const { form } = yield select(state=>state.schedule) 
    const endPointAll=`/horario/salao/${login.salon._id}`
    console.log('SAGAS::allSchedule:', endPointAll)

    try {
        //ATUALIZAR FORM: loading
        yield put(refreshSchedule({ form:{ ...form, filtering:true } }))

        //REQUEST SCHEDULE PARA API:
        const { data } = yield call(api.get, endPointAll)
        
        //ATUALIZAR FORM: loading
        yield put(refreshSchedule({ form:{ ...form, filtering:false } }))

        console.log('SAGAS allSchedule ...',data)
        if( data.error ){
            alert('SAGAS SCHEDULE erro ... ' + data.message)
            return false
        }

        //ATUALIZAR SCHEDULES: (ORIUNDOS API)
        yield put(refreshSchedule({ all:data.schedules }))

    } catch (error) {
        alert('SAGA SCHEDULE erro ... ' + error)
        yield put(refreshSchedule({ form:{ ...form, filterring:false } }))
    }
}

/**
 * @Info Criar client e o relacionamento com um salao.
 *       Post Model:Schedule, Relationship:SalonSchedule
 * @return
 */
export function* addSchedule(){    
    //BUSCAR STATE.SCHEDULE:
    const { current, form, components } = yield select(state=>state.schedule) 
    const endPointAdd = `/horario`
    // console.log('SAGAS::addSchedule::', endPointAdd, current)

    try {
        //ATUALIZAR FORM: loading:
        yield put(refreshSchedule({ form:{ ...form, saving:true } }))

        //REQUEST SCHEDULE PARA API:
        const { data } = yield call(api.post, endPointAdd,{
            salonId: login.salon._id,
            schedule: current
        })
        
        //ATUALIZAR FORM: loading:
        yield put(refreshSchedule({ form:{ ...form, saving:false } }))

        // console.log('SAGAS addSchedules ...',data)
        if( data.error ){
            alert('SAGA SCHEDULE erro ... ' + data.message)
            return false
        }
        
        //RECARREGAR A TABLE:
        yield put(allScheduleAction())
        //FECHAR O COMPONENTE:
        yield put(refreshSchedule({ components:{ ...components, drawer:{ id:null, open:false } } }))
        //LIMPAR FORM:
        yield put(resetSchedule())

    } catch (error) {
        alert('SAGA SCHEDULE erro ... ' + error)
        yield put(refreshSchedule({ form:{ ...form, saving:false } }))
    }
}

/**
 * @Info Busca um horario do salao logado.
 *       Post Model:Schedule ou Get Model:Schedule
 * @returns 
 */
export function* filterSchedule(){
    //BUSCAR STATE.SCHEDULE:
    const { current, form } = yield select(state=>state.schedule) 
    const endPointFilter = `/horario/filtro`//?email=${current.email}&status=a
    console.log('SAGAS::filterSchedules: ###', endPointFilter, current, form )

    try {
        //ATUALIZAR FORM: loading
        yield put(refreshSchedule({ form:{ ...form, filtering:true }}))

        //REQUEST SCHEDULE PARA API:
        const { data } = yield call(api.post, endPointFilter,{
            email: current.email,
            status: "a"
        })
        
        //ATUALIZAR FORM: loading
        yield put(refreshSchedule({ form:{ ...form, filtering:false }}))

        console.log('SAGAS::filterSchedules ... DATA',data)
        if( data.error ){
            alert('SAGA SCHEDULE erro ... ' + data.message)
            return false
        }
        
        //ATUALIZAR STATE:
        if(data.schedules.length > 0){
            yield put(refreshSchedule({ 
                current: data.schedules[0],//PRIMEIRO
                form:{ ...form, filtering:false, disabled:true } 
            }))
        }else{
            //LIBERTAR OS CAMPOS DO FORM: clients:[empty]
            yield put(refreshSchedule({ form:{ ...form, disabled:false } }))
        }

    } catch (error) {
        alert('SAGA SCHEDULE erro ... ' + error)
        yield put(refreshSchedule({ form:{ ...form, filterring:false } }))
    }
}

/**
 * @Info Atualiza horario do salao logado.
 *       Put Relationship:SalonSchedule.
 * @returns 
 */
export function* updateSchedule(){        
    //BUSCAR STATE.SCHEDULE:
    const { current, form, components } = yield select(state=>state.schedule)
    const { services=[], salonSchedule={} } = current
    const endPointUpdate       = `/horario/${current.id}`
    // console.log('SAGAS::updateSchedule:', endPointUpdate, current )

    try {
        //ATUALIZAR FORM: loading:
        yield put(refreshSchedule({ form:{ ...form, saving:true } }))

        //REQUEST SCHEDULE PARA API:
        const { data } = yield call(api.put, endPointUpdate,{
            bondId: salonSchedule.id,
            status: salonSchedule.status,
            services,
        })
        
        //ATUALIZAR FORM: loading:
        yield put(refreshSchedule({ form:{ ...form, saving:false } }))

        console.log('SAGAS updateSchedule ...',data)
        if( data.error ){
            alert('SAGA SCHEDULE erro ... ' + data.message)
            return false
        }
        
        //RECARREGAR A TABLE:
        yield put(allScheduleAction())
        //FECHAR O COMPONENTE:
        yield put(refreshSchedule({ components:{ ...components, drawer:{ id:null, open:false } } }))
        //LIMPAR FORM:
        yield put(resetSchedule())

    } catch (error) {
        alert('SAGA SCHEDULE erro ... ' + error)
        yield put(refreshSchedule({ form:{ ...form, saving:false } }))
    }
}

/**
 * @Info Pseudo delete de horario do salao logado.
 *       Delete Relationship:SalonSchedule
 * @returns 
 */

export function* unlinkSchedule(){
    //BUSCAR STATE.SCHEDULE:
    const { current, form, components } = yield select(state=>state.schedule)
    const { salonSchedule={} } = current
    const endPointUnlink = `/horario/servico/${salonSchedule.id}`
    console.log('SAGAS::unlinkSchedule', endPointUnlink, current)

    try {
        //ATUALIZAR FORM: loading
        yield put(refreshSchedule({ form:{ ...form, saving:true } }))

        //REQUEST SCHEDULE PARA API:
        const { data } = yield call(api.delete, endPointUnlink)
        
        //ATUALIZAR FORM: loading
        yield put(refreshSchedule({ form:{ ...form, saving:false } }))

        console.log('SAGAS unlinkSchedule ... DATA',data)
        if( data.error ){
            alert('SAGA SCHEDULE erro ... ' + data.message)
            return false
        }
        
        //RECARREGAR A TABLE:
        yield put(allScheduleAction())
        //FECHAR O COMPONENTE:
        yield put(refreshSchedule({ components:{ ...components, modal:{ id:null, open:false } } }))
        console.log('SAGAS::refreshSchedule: components', components)
        //LIMPAR FORM:
        yield put(resetSchedule())

    } catch (error) {
        alert('SAGA SCHEDULE erro ... ' + error)
        yield put(refreshSchedule({ form:{ ...form, saving:false } }))
    }
}

/**
 * @Info Buscar todos servicos do horario do salao logado.
 *       Get Relationship:SalonSchedule
 * @returns 
 */
export function* allServicesSchedule(){
    //BUSCAR STATE.SCHEDULE:
    const { current, form, components } = yield select(state=>state.schedule)
    // const { salonClient={} } = current
    const endPointALLService = `/salao/${login.salon._id}/servicos`
    console.log('SAGAS::allServicesSchedule', endPointALLService, current)
    
    try {
        //ATUALIZAR FORM: loading
        yield put(refreshSchedule({ form:{ ...form, filtering:true } }))

        //REQUEST SCHEDULE PARA API:
        const { data } = yield call(api.get, endPointALLService)
        
        //ATUALIZAR FORM: loading
        yield put(refreshSchedule({ form:{ ...form, filtering:false } }))

        console.log('SAGAS allSalonServices::Schedule ...',data)
        if( data.error ){
            alert('SAGA SCHEDULE erro ... ' + data.message)
            return false
        }
        
        //RECARREGAR A TABLE:
        // yield put(allScheduleAction())
        //FECHAR O COMPONENTE:
        yield put(refreshSchedule({ services:data.services, components:{ ...components, drawer:{ id:null, open:false }, modal:{ id:null, open:false } } }))
        //LIMPAR FORM:
        // yield put(resetSchedule())

    } catch (error) {
        alert('SAGA SCHEDULE erro ... ' + error)
        yield put(refreshSchedule({ form:{ ...form, filtering:false } }))
    }
}


export default all([
    takeLatest(ALL_SCHEDULE, allSchedule),
    takeLatest(ADD_SCHEDULE, addSchedule),
    takeLatest(FILTER_SCHEDULE, filterSchedule),
    takeLatest(UPDATE_SCHEDULE, updateSchedule),
    takeLatest(UNLINK_SCHEDULE , unlinkSchedule),
    takeLatest(ALLSERVICES_SCHEDULE , allServicesSchedule),
])