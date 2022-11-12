import './Layout.css'
// import styles from './Layout.module.css'

import Header from "../Header"
import Sidebar from "../Sidebar"
import Footer from '../Footer'


const Layout = (props)=>{
    const { children:content, style } = props
    // console.log('Layout',  style)
        
    return (
        <div className={'layout'} style={style.layout}>
            <Header style={style.header}/>
            <Sidebar style={style.aside}/>
            <main className='mainContent'>
                {content}
            </main>
            <Footer style={style.footer}/>
        </div>
    )
}

export default Layout