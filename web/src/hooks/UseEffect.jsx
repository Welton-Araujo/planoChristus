import { 
    useEffect 
}   from 'react'
import { useDispatch } from 'react-redux'


const useEffectDispatch = (action, params, events=[]) => {
    const dispatch = useDispatch()
    const firstLoading = checkPage(events)
    console.log('useEffect... params $$$', firstLoading)

    //PRIMEIRA VEZ QUE O COMPONENT FOR CARREGADO:
    useEffect(() => {
        if(firstLoading){ dispatch(action(params)) }
    },[dispatch, action, params, firstLoading])
}

const checkPage = (events)=>{
    const firstLoading = Object.keys(events).length === 0
    return firstLoading
} 


export default useEffectDispatch

