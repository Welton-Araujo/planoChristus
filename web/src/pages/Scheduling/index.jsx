// import { useEffect } from 'react'
import { 
    useDispatch, 
    useSelector,
} from 'react-redux'

import moment from 'moment' 

import { useEffectDispatch } from '../../hooks/UseEffect'

import { filterScheduling } from '../../store/modules/scheduling/actions'
import { dateToMin } from '../../utils/operations/time'

import './Scheduling.css'
import Calendar from '../../components/Calendar'


const Scheduling = (props)=>{
    const { style } = props
    // console.log('Scheduling', style) 
    
    const schedules       = useSelector((state)=>state[0].schedules)
    const formattedEvents = formatEvents(schedules)
    
    // console.log('Scheduling::formattedEvents', formattedEvents) 
    
    const dispatch = useDispatch()
    // ATUALIZAR NO CARREGAMENTO:
    useEffectDispatch(filterScheduling)

    return(
        <div className="content schedulingContent h-100">
            <div className="schedulingHeader">
                <h1>Agendamentos</h1>
            </div>
            <div className="row">
                <div className="schedulingCalendar overflow-auto" style={style}>
                    <Calendar style={{padding:'5px'}} 
                        events={formattedEvents} 
                        dispatch={({start, end})=>dispatch(filterScheduling(start, end))}
                    />
                </div>
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
            title: `${schedule.serviceId.title} - ${schedule.clientId.name} - ${schedule.collaboratorId.name}`,
            start,
            end: end
        }
    })
}

export default Scheduling