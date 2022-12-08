import MainMenu from '../MainMenu'

// import logo from '../../../assets/img/logo-wide.png'
import styles from './Sidebar.module.css'

const Sidebar = (props)=>{
    const { 
        title="Menu",
        menus={},
        style={}
    } = props
    // console.log('Sidebar', style)
    
    return (
        <aside className={styles.sidebar} style={style}>
            {/* <img src={logo} alt="logo" className="img-fluid px-3 py-3"/>
            <hr className="hrBorderGradientLight mt-0" /> */}
            <nav className={styles.sideMenu}>
                <div className={styles.titleMainMenu}>{title}</div>
                <hr className={'hrBorderGradient mt-0 mb-2'}/>
                <MainMenu 
                className={styles.itemsMainMenu} 
                menu={menus.itemsMainMenu}                    
                />  
            </nav>
        </aside>
    )
}

export default Sidebar