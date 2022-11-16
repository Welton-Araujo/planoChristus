import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import styles from './Calendar.module.css'

import { events as initEvents } from '../../constants/pages/scheduling'
import { 
    // useEffect,
} from '../../hooks/UseEffect'
const localizer = momentLocalizer(moment)


const MyCalendar = (props) => {
    const { dispatch, events, style } = props
    const eventsList = events ? events : initEvents
    // console.log('MyCalender', style, eventsList)

    return(
        <Calendar className={styles.calendar} style={style}
        localizer={localizer}
        onRangeChange={(period)=>dispatch(formatRange(period))}
        events={eventsList}
        defaultView="week"
        selectable={true}
        popup={true}
        startAccessor="start"
        endAccessor="end"            
        />
    )
}

const formatRange = (period) =>{
    let start = null
    let end = null

    if(Array.isArray(period)){        
        start = period[0]
        end   = period[period.length-1]
    }else{
        start = period.start
        end   = period.end
    }
    
    // console.log('Calendar::onRangeChange', start, end )
    return{ 
        start:  moment(start).format('YYYY-MM-DD'), 
        end:    moment( end ).format('YYYY-MM-DD') 
    }
}

export default MyCalendar