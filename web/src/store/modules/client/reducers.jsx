import produce from 'immer'
import { 
    UPDATE_CLIENT
} from '../actionTypes'


const INITIAL_STATE = {
    clients: [],
    client:{
        name: "",
        phone: "",
        email: "",
        passwd: "",
        photo: "",
        dateBirth: "",
        sex:"",
        status:"",
        document:{
            type:"",
            number:""
        },
        address: {
            street: "",
            number: "",
            district: "",
            zipCode: "",
            city: "",
            state: "",
            country: ""
        },
        geo:{
            type: "",
            coordinates: []
        },
        customerId:""
    },
    form:{
        filtering: false,
        disabled: true,
        saving: false
    },
    behavior: "create",
    components:{
        drawer: false,
        confirmDelete: false
    }
}

const client = (state=INITIAL_STATE, action) => {
    // console.log('REDUCER CLIENT', state, action)
    switch (action.type) {
        case UPDATE_CLIENT:
            return produce(state, (draft)=>{
                draft = { ...draft, ...action.payload }
                return draft
            })
        default:
            return state
    }
}

export default client