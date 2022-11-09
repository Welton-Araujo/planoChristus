import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Layuot from "./components/Layout"
import Scheduling from './pages/Scheduling'
import Client from './pages/Client'

export default ()=>{
    return(
        <Layuot>
            <Router>
                <Routes>
                    <Route path='/' exact element={<Scheduling/>}/>
                    <Route path='/cliente' element={<Client/>}/>
                </Routes>
            </Router>
        </Layuot>
    )
}