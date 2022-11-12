import { 
    useEffect as _useEffect 
}   from 'react'
import { useDispatch } from 'react-redux'

import moment from 'moment'

const START =  moment().weekday(0).format('YYYY-MM-DD')
const END   =  moment().weekday(6).format('YYYY-MM-DD')


const useEffect = (action, start=START, end=END) => {
    console.log('useEffect...s,e', start, end)
    const dispatch = useDispatch()
    //TODAS VEZ QUE O COMPONENT FOR CARREGADO:
    _useEffect(() => {
        dispatch(action(start, end))
    },[dispatch, action])
}


export {
    useEffect,
}

