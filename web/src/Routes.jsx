import { 
    BrowserRouter, 
    Routes as AllRoutes, 
    Route 
} from 'react-router-dom'

import Scheduling   from './pages/Scheduling'
import Client       from './pages/Client'
import Collaborator from './pages/Collaborator'

const Routes = ()=>{
    return(
        // <BrowserRouter>
            <AllRoutes>
                <Route path='/' exact element={<Scheduling/>}/>
                <Route path='/clientes'      element={<Client/>}/>
                <Route path='/colaboradores' element={<Collaborator/>}/>
            </AllRoutes>
        // </BrowserRouter>
    )
}

export {
    BrowserRouter,
    Routes
}