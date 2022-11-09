import Header from "../Header"
import Sidebar from "../sidebar"

import '../../style.css'
import './Layout.module.css'

const Layuot = (props)=>{
    console.log('Laoyout', props.children)
    return (
        <div>
            <Header/>
            <div className="container-fluid h-100">
                <div className="row h-100">
                    <Sidebar/>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Layuot