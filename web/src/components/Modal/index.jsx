import { useState } from 'react'
import { Modal, Button, ButtonToolbar } from 'rsuite'

import styles from './Modal.module.css'


const MyModal = (props) => {
    const { 
        id=null,
        config={}, 
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

    //STATE VIA SAGAS:
    const { 
        component, 
        handleOpen,
        handleClose, 
    } = customState
    // console.log("Modal ... ", id, component, )

    //STATE PADRAO:
    const [open, setOpen] = useState(false)
    const _handleOpen     = ()=>setOpen(true)
    const _handleClose    = ()=>setOpen(false)

    return (
        <div className={styles.modal} style={style}>
        {   buttonOpen.disabled ? false :
            <ButtonToolbar>
                <Button style={{color:"inherit"}}
                    onClick={handleOpen || _handleOpen}
                    appearance={buttonOpen.appearance||"default"}>
                    {buttonOpen.title||'Open'}
                </Button>
            </ButtonToolbar>
        }
            <Modal 
            open    = {component.id===id || open} 
            onClose = {handleClose       || _handleClose} >
                <Modal.Header>
                    <Modal.Title>{config.title||'Detalhes'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{marginTop:"10px"}}
                    onClick    = {handleClose || _handleClose} 
                    loading    = {buttonSubmit.loading || false}
                    appearance = {buttonSubmit.appearance || "primary"}>
                        {buttonSubmit.title || "Close"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}


export default MyModal
