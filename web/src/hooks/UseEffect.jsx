import { 
    useEffect 
}   from 'react'
import { useDispatch } from 'react-redux'


const useEffectDispatch = (action, params=null, load) => {
    const dispatch = useDispatch()
    // console.log('useEffect ### params...', )

    //NO CARREGAMENTO DO COMPONENT:
    useEffect(() => {
        if(load){ dispatch(action(params)) }
    },[dispatch, action, params, load])
}


export default useEffectDispatch

