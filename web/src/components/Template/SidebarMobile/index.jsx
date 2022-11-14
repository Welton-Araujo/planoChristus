import { useState } from "react"
import { Drawer, ButtonToolbar, Button, Placeholder } from "rsuite"

import MainMenu from "../../MainMenu"
import styles from "./SideberMobile.module.css"


const SidebarMobile = (props) => {
    const [open, setOpen] = useState(false)
    const [openWithHeader, setOpenWithHeader] = useState(false)
    const { companyInfo, style } = props
    // console.log('SidebarMobile', companyInfo)

    return (
        <div className={styles.sidebaModile}>
        <ButtonToolbar>
            {/* <Button onClick={() => setOpen(true)}>Open</Button> */}
            <Button onClick={() => setOpenWithHeader(true)} className={styles.button}>
            <span className="mdi mdi-menu"></span>
            </Button>
        </ButtonToolbar>

        <Drawer open={open} onClose={() => setOpen(false)}>
            <Drawer.Body>
                <Placeholder.Paragraph />
            </Drawer.Body>
        </Drawer>

        <Drawer open={openWithHeader} onClose={() => setOpenWithHeader(false)} style={{width:"80%"}} >
            <Drawer.Header>
                <Drawer.Title>{companyInfo.fantasyName || 'Menu'}</Drawer.Title>
                <Drawer.Actions>
                    {/* <Button onClick={() => setOpenWithHeader(false)}>Cancelar</Button> */}
                    <Button
                    onClick={() => setOpenWithHeader(false)}
                    appearance="primary"
                    >
                    Fechar
                    </Button>
                </Drawer.Actions>
            </Drawer.Header>
            <Drawer.Body>
                {/* <Placeholder.Paragraph /> */}
                <div className={styles.sideMenuMobile}>
                    <MainMenu />
                </div>
            </Drawer.Body>
        </Drawer>
        </div>
    )
}

export default SidebarMobile
