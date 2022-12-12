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
import MyCalendar from '../../components/Calendar'

//TEST STATIC:
import loginFake from '../../data/fakeReq/login.json'
//DATA DE HOJE: (AO CARREGAR A PAGINA)
const firstWeekday =  moment().weekday(0).format('YYYY-MM-DD')//"2022-12-11"
const lastweekday  =  moment().weekday(6).format('YYYY-MM-DD')//"2022-12-17"

const { name:salonName } = loginFake.salon
let stap = 0


const Scheduling = (props)=>{
    const { style } = props
    // console.log('Scheduling', style) 

    //STATE: inicial=[] e atualizado=[...] 
    const { all, current }  = useSelector((state)=>state.scheduling)
    console.log('Scheduling:: current', current,{ firstWeekday, lastweekday})
    const formattedEvents   = formatEvents(all)
    // console.log('formattedEvents', formattedEvents)
    
    const dispatch = useDispatch()
    // ATUALIZAR STATE NO LOAD DA PAGE: API
    useEffectDispatch(filterScheduling, {start:firstWeekday, end:lastweekday}, load())

    return(
        <div className={`content ${styles.schedulingContent}`}>
            <div className={styles.schedulingHeader}>
                <div className={styles.schedulingTitle}>
                    <h1 className='pageTitle'>Agendamentos</h1>
                    <small>{salonName}</small>
                </div>
            </div>
            <div className={styles.schedulingBody} style={style}>
                <MyCalendar
                events={formattedEvents}
                onRangeChange={ ({start, end})=>{
                    console.log("CHANGE ###", {start, end})
                    dispatch(filterScheduling({start, end}))
                }}
                style={{padding:'5px'}} 
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

const load = (attempts=1) =>{
    return (stap++ <= attempts)
}


export default Scheduling