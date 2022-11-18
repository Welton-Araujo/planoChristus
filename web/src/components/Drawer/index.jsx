import { Drawer,Button } from "rsuite"

import './Drawer.css'
import styles from './Drawer.module.css'


const MyDrawer = (props)=>{
    const { 
        className="DrawerDefault",
        title='Cadastro', 
        placement='left', 
        buttonSubmit={},
        components={}, 
        setComponent=()=>{}, 
        children=undefined, 
        style={} 
    } = props
    // console.log('MyDrawer ... ', buttonSubmit, style)
    
    // const handleOpen  = ()=>setComponent('drawer', true)
    const handleClose = ()=>setComponent('drawer', false)
    
    return(
        <div className={styles.clientDrawer} >
            <Drawer className={className} style={style} 
            placement={placement}
            size={"sm"}
            open={components.drawer} 
            onClose={handleClose} >
                <Drawer.Header>
                    <Drawer.Title>{title}</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                    {children}                    
                    <Drawer.Actions>
                        <Button className={styles.buttonSubmit} style={buttonSubmit.style}
                        loading={buttonSubmit.loading||false}
                        onClick={buttonSubmit.onClick||handleClose} 
                        appearance={buttonSubmit.appearance||"primary"}>
                            {buttonSubmit.title||'Close'}
                        </Button>
                    </Drawer.Actions>
                </Drawer.Body>
            </Drawer>
        </div>
    )
}


export default MyDrawer