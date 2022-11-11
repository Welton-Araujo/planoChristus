import './index.css'

import logo from '../../assets/img/logo-small.png'

const Header = (props)=>{
    const { style } = props
    console.log('Header',style)
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
                <img src="https://cdn-icons-png.flaticon.com/512/147/147142.png" alt='avatar'/>
                <span className="mdi mdi-chevron-down text-white"></span>
            </div>
        </header>
    )
}

export default Header