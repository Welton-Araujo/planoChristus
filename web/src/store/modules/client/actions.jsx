import { 
    CLIENT_ALL,
    CLIENT_FILTER,
    CLIENT_UPDATE,
} from '../actionTypes'


const allClient = () =>{
    // console.log('allClient', )
    return{ type: CLIENT_ALL }
}

const filterClient = (payload) =>{
    // console.log('filterClient', payload,  )
    return{ type: CLIENT_FILTER, payload }
}

const updateClient = (payload) =>{
    // console.log('updateClient', payload,  )
    return{ type: CLIENT_UPDATE, payload }
}

export {

    allClient,
    filterClient,
    updateClient,

}