import { useState } from 'react'
import { Modal, Button, ButtonToolbar } from 'rsuite'

import styles from './MyModal.module.css'


const MyModal = (props) => {
    const { 
        id="myModal",
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
    // console.log("Modal ... ", id,)

    //STATE VIA SAGAS:
    const { 
        component, 
        handleOpen,
        handleClose, 
    } = customState

    //STATE PADRAO:
    const [open, setOpen] = useState(false)
    const _handleOpen     = ()=>setOpen(true)
    const _handleClose    = ()=>setOpen(false)

    return (
        <div className={styles.myModal} style={style}>
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
                <Modal.Body className={styles.myModalBody}>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                {   buttonSubmit.disabled ? false :
                    <Button style={{marginTop:"10px"}}
                    onClick    = {handleClose || _handleClose} 
                    loading    = {buttonSubmit.loading    || false}
                    appearance = {buttonSubmit.appearance || "primary"}>
                        {buttonSubmit.title || "Close"}
                    </Button>
                }
                </Modal.Footer>
            </Modal>
        </div>
    )
}


export default MyModal
