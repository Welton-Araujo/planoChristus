import MainMenu from '../../MainMenu'

import logo from '../../../assets/img/logo.png'
import './Sidebar.css'

const Sidebar = (props)=>{
    const { menus, style } = props
    // console.log('Sidebar', style)
    
    return (
        <aside className="sidebar h-100" style={style}>
            <img src={logo} alt="logo" className="img-fluid px-3 py-3"/>
            <hr className="hrBorderGradientLight mt-0" />
            <nav className="sideMenu">
               <MainMenu menu={menus.itemsMainMenu}/>  
            </nav>
        </aside>
    )
}

export default Sidebar