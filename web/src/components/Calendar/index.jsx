import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/pt-br'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import styles from './Calendar.module.css'

import { events as initEvents } from '../../constants/pages/scheduling'
import { 
    // useEffect,
} from '../../hooks/UseEffect'
moment.locale('pt-br')
const localizer = momentLocalizer(moment)
const today     = new Date()

const MyCalendar = (props) => {
    const { 
        toolbar=true,
        formats={
            dateFormat:'dd',
            dayFormat: (date, culture, localizer)=> localizer.format(date, 'dddd', culture),
        },
        date=today,
        defaultView="week",
        events=initEvents, 
        onRangeChange=()=>{},
        onSelectEvent=(e)=>{console.log(e)},
        style={} 
    } = props
    // console.log('MyCalender ### ', date)

    return(
        <Calendar className={styles.calendar} style={style}
        localizer={localizer}
        toolbar={toolbar}
        formats={formats}
        popup
        selectable
        events={events}
        defaultDate={date}
        defaultView={defaultView}
        startAccessor="start"
        endAccessor="end"            
        onRangeChange={(period)=>onRangeChange(formatRange(period))}
        onSelectEvent={(event)=>{onSelectEvent(event)}}
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