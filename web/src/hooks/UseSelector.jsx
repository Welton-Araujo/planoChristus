import { 
    useSelector,
} from 'react-redux'


const useSelectorState = (stateType)=>{
    console.log('useSelector... stateType', stateType)
    return useSelector((state)=>{
        for (const key in state) {
            if(state[key][stateType]) return state[key][stateType]
        }
        return []
    })
}


export default useSelectorState
