// import { useEffect } from 'react'
import { 
    useDispatch,
    useSelector,
} from 'react-redux'

import moment from 'moment' 

import useEffectDispatch from '../../hooks/UseEffect'

import { filterScheduling } from '../../store/modules/scheduling/actions'
import { dateToMin } from '../../utils/operations/time'

import styles from './Scheduling.module.css'
import Calendar from '../../components/Calendar'

//TEST STATIC:
// import schedules from '../../data/componentTest/scheduling.json' 
//DATA DE HOJE: (AO CARREGAR A PAGINA)
const start =  moment().weekday(0).format('YYYY-MM-DD')
const end   =  moment().weekday(6).format('YYYY-MM-DD')


const Scheduling = (props)=>{
    const { style } = props
    // console.log('Scheduling', style) 

    const schedules       = useSelector((state)=>state.SCHEDULING.payload)
    const formattedEvents = formatEvents(schedules)
    // console.log('formattedEvents', formattedEvents)
    
    const dispatch = useDispatch()
    // ATUALIZAR NO CARREGAMENTO:
    useEffectDispatch(filterScheduling, {start, end}, schedules)
    
    return(
        <div className={`content ${styles.schedulingContent}`}>
            <div className={styles.schedulingHeader}>
                <h1>Agendamentos</h1>
            </div>
            <div className={styles.schedulingBody} style={style}>
                <Calendar style={{padding:'5px'}} 
                    events={formattedEvents}
                    dispatch={({start, end})=>dispatch(filterScheduling({start, end}))}
                />
            </div>
        </div>    
    )
}

const formatEvents = (schedules) =>{
    return schedules.map((schedule)=>{
        const start  = moment(schedule.date).toDate()
        const allMin = dateToMin(schedule.duration)// Date_Hour_Min => AllMin
        const end    = moment(schedule.date).add(allMin,'minutes').toDate()
        return{
            title: `${schedule.serviceId.title} - ${schedule.clientId.name} - ${schedule.collaboratorId.name} - ${schedule.date} `,
            start,
            end
        }
    })
}

export default Scheduling