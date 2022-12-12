import { useState } from "react"
import MyDrawer from "../../Drawer"

import MainMenu from "../MainMenu"
import styles from "./SideberMobile.module.css"


const SidebarMobile = (props) => {
    const { 
        menus={}, 
        companyInfo={}, 
        style={} 
    } = props
    
    //STATE PADRAO:
    const [open, setOpen] = useState({id:null, open:false})
    const handleOpen      = ()=>setOpen({id:"drawer-mobile", open:true})
    const handleClose     = ()=>setOpen({id:null, open:false})
    // console.log('SidebarMobile ### ...', )

    return (
        <div className={styles.sidebaModile} style={style}>
            <MyDrawer className={styles.sideMobileDrawer} style={{with:"80%"}}
            id={'drawer-mobile'}
            title={companyInfo.fantasyName || "Menu"} 
            component={open}
            placement={'right'}
            buttonOpen={{
                title: <span className="mdi mdi-menu"></span>,
                appearance:"default",
                handleOpen
            }}
            buttonSubmit={{
                title:<span className="mdi mdi-exit-to-app"> Sair</span>,
                handleClose
            }} >
                <div className={styles.sideMobileMenu}>
                    <MainMenu 
                    className={styles.itemsMainMenu} 
                    menu={menus.itemsMainMenu}
                    onClose={handleClose}                        
                    />
                </div>
            </MyDrawer>
        </div>
    )
}

export default SidebarMobile
