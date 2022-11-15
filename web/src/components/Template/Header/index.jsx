import SidebarMobile from '../SidebarMobile'

import styles from './Header.module.css'

import logo from '../../../assets/img/logo-small.png'
import avatar from '../../../assets/img/avatar.png'


const Header = (props)=>{
    const { menus={}, companyInfo={}, avatarInfo={}, style={} } = props
    // console.log('Header', avatarInfo,style)
    
    return (
        <header className="" >
            <div className={styles.logo}>
                <a href='/'>
                    <img src={logo} alt="logo" className="img-fluid px-3 py-1"/>
                </a>
                <span>{companyInfo.fantasyName||'Company'}</span>
            </div>
            <div className={styles.mainMenu}>
                <div className={styles.secondaryMenu} style={style}>
                    <div className="">
                        <span className="d-block m-0 p-0 text-white">{ avatarInfo.firstName } { avatarInfo.lastName || 'Anonymous' }</span>
                        <small className={styles.subtitle}>{ avatarInfo.userName || '@anonymous' }</small>
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