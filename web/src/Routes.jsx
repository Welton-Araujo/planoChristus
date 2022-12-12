import { 
    BrowserRouter, 
    Routes as AllRoutes, 
    Route 
} from 'react-router-dom'

import Scheduling   from './pages/Scheduling'
import Schedule     from './pages/Schedule'
import Client       from './pages/Client'
import Collaborator from './pages/Collaborator'
import Service      from './pages/Service'

const Routes = ()=>{
    return(
        // <BrowserRouter>
            <AllRoutes>
                <Route path='/' exact        element={<Scheduling/>}/>
                <Route path='/horarios'      element={<Schedule/>}/>
                <Route path='/clientes'      element={<Client/>}/>
                <Route path='/colaboradores' element={<Collaborator/>}/>
                <Route path='/servicos'      element={<Service/>}/>
            </AllRoutes>
        // </BrowserRouter>
    )
}

export {
    BrowserRouter,
    Routes
}