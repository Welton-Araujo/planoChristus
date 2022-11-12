import { Link } from 'react-router-dom'

import logo from '../../../assets/img/logo.png'
import './Sidebar.css'

const Sidebar = (props)=>{
    const { style } = props
    // console.log('Sidebar', style)
    
    return (
        <aside className="sidebar h-100" style={style}>
            <img src={logo} alt="logo" className="img-fluid px-3 py-3"/>
            <hr className="hrBorderGradientLight mt-0" />
            <nav className="sideMenu">
                <Link to="/"><span className="mdi mdi-calendar-check"> Agendamentos</span></Link>
                <Link to="/clientes"><span className="mdi mdi-account-multiple"> Clientes</span></Link>                 
            </nav>
        </aside>
    )
}

export default Sidebar