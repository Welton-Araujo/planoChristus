import './Layout.css'
// import styles from './Layout.module.css'

import Header from "../Header"
import Sidebar from "../Sidebar"
import Footer from '../Footer'

import menus from '../../../constants/templates/header'
import companyInfo from '../../../data/componentTest/companyInfo.json'
import avatarInfo from '../../../data/componentTest/avatarInfo.json'


const Layout = (props)=>{
    const { children:content, style={} } = props
    // console.log('Layout',  menus, style)
        
    return (
        <div className={'layout'} style={style.layout}>
            <Header  menus={menus} companyInfo={companyInfo} avatarInfo={avatarInfo} style={style.header}/>
            <Sidebar menus={menus} style={style.aside}/>
            <main className='mainContent'>
                {content}
            </main>
            <Footer companyInfo={companyInfo} style={style.footer}/>
        </div>
    )
}

export default Layout