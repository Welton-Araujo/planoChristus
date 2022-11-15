import SidebarMobile from '../SidebarMobile'

import './Header.css'

import logo from '../../../assets/img/logo-small.png'
import avatar from '../../../assets/img/avatar.png'


const Header = (props)=>{
    const { menus, companyInfo, avatarInfo, style } = props
    // console.log('Header', avatarInfo,style)
    
    return (
        <header className="" >
            <div className="logo">
                <img src={logo} alt="logo" className="img-fluid px-3 py-1"/>
                <span>{companyInfo.fantasyName||'Company'}</span>
            </div>
            <div className="mainMenu">
                <div className="secondaryMenu" style={style}>
                    <div className="">
                        <span className="d-block m-0 p-0 text-white">{ avatarInfo.firstName } { avatarInfo.lastName || 'Anonymous' }</span>
                        <small className="subtitle">{ avatarInfo.userName || '@anonymous' }</small>
                    </div>
                    <img src={avatar} alt='avatar'/>
                    <span className="mdi mdi-chevron-down text-white"></span>
                </div>            
                <SidebarMobile menus={menus} companyInfo={companyInfo} style={style}/>
            </div>
        </header>
    )
}

export default Header