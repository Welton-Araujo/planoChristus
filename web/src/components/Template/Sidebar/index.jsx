import MainMenu from '../MainMenu'

// import logo from '../../../assets/img/logo.png'
import styles from './Sidebar.module.css'

const Sidebar = (props)=>{
    const { menus={}, style={} } = props
    // console.log('Sidebar', style)
    
    return (
        <aside className={styles.sidebar} style={style}>
            {/* <img src={logo} alt="logo" className="img-fluid px-3 py-3"/> */}
            <hr className="hrBorderGradientLight mt-0" />
            <nav className={styles.sideMenu}>
               <MainMenu menu={menus.itemsMainMenu}/>  
            </nav>
        </aside>
    )
}

export default Sidebar