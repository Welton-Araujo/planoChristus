const INITIAL_STATE = {
    schedules:[]
}

const scheduling = (state = INITIAL_STATE, action) =>{
    switch (action.type) {
        case '@scheduling/ALL':
            return{

            }    
        default:
            return state
    }
}

export default scheduling