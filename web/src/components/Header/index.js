import './Header.css'

import logo from '../../assets/img/logo-small.png'
import avatar from '../../assets/img/avatar.png'

const Header = (props)=>{
    const { style } = props
    // console.log('Header',style)
    
    return (
        <header className="" >
            <div className="logo">
                <img src={logo} alt="logo" className="img-fluid px-3 py-4"/>
            </div>
            <div className="secondaryMenu" style={style}>
                <div className="">
                    <span className="d-block m-0 p-0 text-white">Barbaria Tal</span>
                    <small className="subtitle">Plano Gold</small>
                </div>
                <img src={avatar} alt='avatar'/>
                <span className="mdi mdi-chevron-down text-white"></span>
            </div>
        </header>
    )
}

export default Header