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
    console.log('MyDrawer ... ', buttonSubmit, style)
    
    // const handleOpen  = ()=>setComponent('drawer', true)
    const handleClose = ()=>setComponent('drawer', false)
    
    return(
        <div className={styles.myDrawer} style={style}>
            <Drawer className={className}  
            placement={placement}
            size={"sm"}
            open={components.drawer} 
            onClose={handleClose} >
                <Drawer.Header>
                    <Drawer.Title>{title}</Drawer.Title>
                        {   buttonSubmit.disabled ? false :
                        <Drawer.Actions>
                            <Button className = {styles.buttonSubmit} style = {buttonSubmit.style}
                                loading     = {buttonSubmit.loading    || false}
                                appearance  = {buttonSubmit.appearance || "primary"}
                                onClick     = {buttonSubmit.onClick    || handleClose} >
                                    {buttonSubmit.title||'Close'}
                            </Button>
                        </Drawer.Actions>
                        }
                </Drawer.Header>
                <Drawer.Body>
                    {children}
                </Drawer.Body>
            </Drawer>
        </div>
    )
}


export default MyDrawer