import { 
    BrowserRouter, 
    Routes as AllRoutes, 
    Route 
} from 'react-router-dom'

import Scheduling from './pages/Scheduling'
import Client from './pages/Client'

const Routes = ()=>{
    return(
        // <BrowserRouter>
            <AllRoutes>
                <Route path='/' exact element={<Scheduling/>}/>
                <Route path='/clientes' element={<Client/>}/>
            </AllRoutes>
        // </BrowserRouter>
    )
}

export {
    BrowserRouter,
    Routes
}