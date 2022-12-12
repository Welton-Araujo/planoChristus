import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import { 
    // API
    ALL_SCHEDULE, 
    ADD_SCHEDULE,
    UPDATE_SCHEDULE,
    UNLINK_SCHEDULE,
    ALLSERVICES_SCHEDULE,
    FILTERCOLLABORATORS_SCHEDULE,
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
            alert('SAGAS allSchedule erro ... ' + data.message)
            return false
        }

        //ATUALIZAR SCHEDULES: (ORIUNDOS API)
        yield put(refreshSchedule({ all:data.schedules }))

    } catch (error) {
        alert('SAGA allSchedule erro ... ' + error)
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
            ...current,
            salonId: login.salon._id,
        })
        
        //ATUALIZAR FORM: loading:
        yield put(refreshSchedule({ form:{ ...form, saving:false } }))

        // console.log('SAGAS addSchedules ...',data)
        if( data.error ){
            alert('SAGA addSchedules erro ... ' + data.message)
            return false
        }
        
        //RECARREGAR:
        yield put(allScheduleAction())
        //FECHAR O COMPONENTE:
        yield put(refreshSchedule({ components:{ ...components, drawer:{ id:null, open:false } } }))
        //LIMPAR FORM:
        yield put(resetSchedule())

    } catch (error) {
        alert('SAGA addSchedules erro ... ' + error)
        yield put(refreshSchedule({ form:{ ...form, saving:false } }))
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
    const endPointUpdate = `/horario/${current._id}`
    // console.log('SAGAS::updateSchedule:', endPointUpdate, current )

    try {
        //ATUALIZAR FORM: loading:
        yield put(refreshSchedule({ form:{ ...form, saving:true } }))

        //REQUEST SCHEDULE PARA API:
        const { data } = yield call(api.put, endPointUpdate,{
            ...current,
            salonId: login.salon._id,
        })
        
        //ATUALIZAR FORM: loading:
        yield put(refreshSchedule({ form:{ ...form, saving:false } }))

        console.log('SAGAS updateSchedule ...',data)
        if( data.error ){
            alert('SAGA updateSchedule erro ... ' + data.message)
            return false
        }
        
        //RECARREGAR:
        yield put(allScheduleAction())
        //FECHAR O COMPONENTE:
        yield put(refreshSchedule({ components:{ ...components, drawer:{ id:null, open:false } } }))
        //LIMPAR FORM:
        yield put(resetSchedule())

    } catch (error) {
        alert('SAGA updateSchedule erro ... ' + error)
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
    const endPointUnlink = `/horario/${current._id}`
    console.log('SAGAS::unlinkSchedule', endPointUnlink, current)

    try {
        //ATUALIZAR FORM: loading
        yield put(refreshSchedule({ form:{ ...form, saving:true } }))

        //REQUEST SCHEDULE PARA API:
        const { data } = yield call(api.delete, endPointUnlink,{})
        
        //ATUALIZAR FORM: loading
        yield put(refreshSchedule({ form:{ ...form, saving:false } }))

        console.log('SAGAS unlinkSchedule ... DATA',data)
        if( data.error ){
            alert('SAGA unlinkSchedule erro ... ' + data.message)
            return false
        }
        
        //RECARREGAR A TABLE:
        yield put(allScheduleAction())
        //FECHAR O COMPONENTE:
        yield put(refreshSchedule({ 
            components:{ ...components,
            drawer:{ id:null, open:false },
            modal:{ id:null, open:false } } 
        }))
        //LIMPAR FORM:
        yield put(resetSchedule())

    } catch (error) {
        alert('SAGA unlinkSchedule erro ... ' + error)
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
    const endPointALLService = `/salao/${login.salon._id}/servicos`
    console.log('SAGAS::allServicesSchedule', endPointALLService, current)
    
    try {
        //ATUALIZAR FORM: loading
        yield put(refreshSchedule({ form:{ ...form, filtering:true } }))

        //REQUEST SCHEDULE PARA API:
        const { data } = yield call(api.get, endPointALLService)
        
        //ATUALIZAR FORM: loading
        yield put(refreshSchedule({ form:{ ...form, filtering:false } }))

        console.log('SAGAS allServicesSchedule ...',data)
        if( data.error ){
            alert('SAGA allServicesSchedule erro ... ' + data.message)
            return false
        }
        
        //RECARREGAR A TABLE:
        // yield put(allScheduleAction())
        //FECHAR O COMPONENTE:
        yield put(refreshSchedule({ 
            services:data.services, 
            components:{ ...components, drawer:{ id:null, open:false }, modal:{ id:null, open:false } }
        }))
        //LIMPAR FORM:
        // yield put(resetSchedule())

    } catch (error) {
        alert('SAGA allServicesSchedule erro ... ' + error)
        yield put(refreshSchedule({ form:{ ...form, filtering:false } }))
    }
}

/**
 * @Info Busca um horario do salao logado.
 *       Post Model:Schedule ou Get Model:Schedule
 * @returns 
 */
export function* filterCollaboratorsSchedule(){
    //BUSCAR STATE.SCHEDULE:
    const { current, form } = yield select(state=>state.schedule) 
    const endPointFilter = `/horario/colaboradores`
    console.log('SAGAS::filterCollaboratorsSchedule: ###', endPointFilter, current.services )

    try {
        //ATUALIZAR FORM: loading
        yield put(refreshSchedule({ form:{ ...form, filtering:true }}))

        //REQUEST COLLAB PARA API:
        const { data } = yield call(api.post, endPointFilter,{ services:current.services })
        
        //ATUALIZAR FORM: loading
        yield put(refreshSchedule({ form:{ ...form, filtering:false }}))

        console.log('SAGAS::filterCollaboratorsSchedule ... DATA',data)
        if( data.error ){
            alert('SAGA filterCollaboratorsSchedule erro ... ' + data.message)
            return false
        }
        
        //ATUALIZAR:
        yield put(refreshSchedule({ collaborators:data.collaborators }))

    } catch (error) {
        alert('SAGA filterCollaboratorsSchedule erro ... ' + error)
        yield put(refreshSchedule({ form:{ ...form, filterring:false } }))
    }
}


export default all([
    takeLatest(ALL_SCHEDULE, allSchedule),
    takeLatest(ADD_SCHEDULE, addSchedule),
    takeLatest(UPDATE_SCHEDULE, updateSchedule),
    takeLatest(UNLINK_SCHEDULE , unlinkSchedule),
    takeLatest(ALLSERVICES_SCHEDULE , allServicesSchedule),
    takeLatest(FILTERCOLLABORATORS_SCHEDULE, filterCollaboratorsSchedule),
])