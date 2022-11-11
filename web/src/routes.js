import { 
    // BrowserRouter as Router, 
    Routes, 
    Route 
} from 'react-router-dom'

import Scheduling from './pages/Scheduling'
import Client from './pages/Client'

const MainRouter = ()=>{
    return(
        // <Router>
            <Routes>
                <Route path='/' exact element={<Scheduling/>}/>
                <Route path='/clientes' element={<Client/>}/>
            </Routes>
        // </Router>
    )
}

export default MainRouter