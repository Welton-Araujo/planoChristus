import './index.css'
// import styles from './Layout.module.css'

import Header from "../Header"
import Sidebar from "../Sidebar"

const Layuot = (props)=>{
    const { children:content, style } = props
    console.log('Layout',  style)
        
    return (
        // <div className={'layout'}>
        <div className={'layout'} style={style.layout}>
            <Header style={style.header}/>
            <Sidebar style={style.aside}/>
            <main>
                {content}
            </main>
            <footer> roda pé </footer>
        </div>
    )
}

export default Layuot