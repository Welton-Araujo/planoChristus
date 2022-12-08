import SidebarMobile from '../SidebarMobile'

import styles from './Header.module.css'

import logoInfo from '../../../data/componentTest/logoInfo.json'
import avatar from '../../../assets/img/avatar.png'
import Logo from '../Logo'


const Header = (props)=>{
    const { 
        menus={}, 
        companyInfo={}, 
        avatarInfo={}, 
        style={} 
    } = props
    // console.log('Header', avatarInfo,style)
    
    return (
        <header className="" >
            <Logo 
                title={logoInfo.title}
                splitTitle={logoInfo.splitTitle}
                subtitle={logoInfo.subtitle}
                img={logoInfo.img}
            />
            <div className={styles.mainMenu}>
                <div className={styles.secondaryMenu} style={style}>
                    <div className="">
                        <span className="d-block m-0 p-0 text-white">{ avatarInfo.firstName } { avatarInfo.lastName || 'Anonymous' }</span>
                        <small className={styles.subtitle}>{ avatarInfo.userName || '@anonymous' }</small>
                    </div>
                    <img src={avatar} alt='avatar'/>
                    <span className="mdi mdi-chevron-down text-white"></span>
                </div>            
                <SidebarMobile 
                menus={menus}
                companyInfo={companyInfo}
                style={style}
                />
            </div>
        </header>
    )
}

export default Header