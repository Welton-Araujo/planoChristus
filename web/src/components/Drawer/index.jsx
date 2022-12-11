import { useState } from "react"
import { Drawer, ButtonToolbar, Button } from "rsuite"

import './Drawer.css'
import styles from './Drawer.module.css'


const MyDrawer = (props)=>{
    const { 
        id=null,
        className="",
        title='Lateral', 
        placement='rigth', 
        buttonOpen={},
        buttonSubmit={},
        customState={
            component:{ id:null, open:false },
            handleOpen:undefined, 
            handleClose:undefined,
        },
        children=undefined, 
        style={} 
    } = props
    
    //STATE VIA SAGA(REDUX):
    const { 
        component, 
        handleOpen,
        handleClose, 
    } = customState
    // console.log('MyDrawer ... id', id, customState,  )
    
    //STATE REACT:
    const [open, setOpen] = useState(false)
    const _handleOpen     = ()=>setOpen(true)
    const _handleClose    = ()=>setOpen(false)

    return(
        <div className={styles.myDrawerPanel}>
        {   buttonOpen.disabled ? false :
            <ButtonToolbar>
                <Button className={styles.buttonOpen} style={buttonOpen.style}
                    onClick    = {handleOpen || _handleOpen}
                    appearance = {buttonOpen.appearance || "primary"} >
                    {buttonOpen.title || 'Open'}
                </Button>
            </ButtonToolbar>
        }
            {/* DRAWER */}
            <Drawer className={className} style={{...style}}  
            placement = {placement} 
            size      = {"sm"}
            open      = {component.id===id || open}  
            onClose   = {handleClose       || _handleClose} 
            >
                <Drawer.Header>
                    <Drawer.Title>{title}</Drawer.Title>
                        {   buttonSubmit.disabled ? false :
                        <Drawer.Actions>
                            <Button className = {styles.buttonSubmit} style = {buttonSubmit.style}
                                onClick     = {handleClose || _handleClose} 
                                loading     = {buttonSubmit.loading    || false}
                                appearance  = {buttonSubmit.appearance || "primary"} >
                                    {buttonSubmit.title||'Close'}
                            </Button>
                        </Drawer.Actions>
                        }
                </Drawer.Header>
                <Drawer.Body className={styles.myDrawerBody}>
                    {children}
                </Drawer.Body>
            </Drawer>
        </div>
    )
}


export default MyDrawer