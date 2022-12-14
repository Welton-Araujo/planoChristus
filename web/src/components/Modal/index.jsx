import { useState } from 'react'
import { Modal, Button, ButtonToolbar } from 'rsuite'

import styles from './MyModal.module.css'


const MyModal = (props) => {
    const { 
        id="myModal",
        config={}, 
        component={},
        buttonOpen={},
        buttonSubmit={},
        children=undefined, 
        style={} 
    } = props
    // console.log("MyModal ... ", id, buttonOpen)

    //STATE REACT:
    const [open, setOpen] = useState(false)
    const _handleOpen     = ()=>setOpen(true)
    const _handleClose    = ()=>setOpen(false)

    return (
        <div className={styles.myModal}>
        {   buttonOpen.disabled ? false :
            <ButtonToolbar>
                <Button className={buttonOpen.className} style={buttonOpen.style}
                    onClick={buttonOpen.handleOpen || _handleOpen}
                    appearance={buttonOpen.appearance||"ghost"}
                    color={buttonOpen.color||"blue"}
                    >
                    {buttonOpen.title||'Open'}
                </Button>
            </ButtonToolbar>
        }
            <Modal style={style}
            open    = {component.id===id || open} 
            onClose = {buttonSubmit.handleClose  || _handleClose} >
                <Modal.Header>
                    <Modal.Title>{config.title||'Detalhes'}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.myModalBody}>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                {   buttonSubmit.disabled ? false :
                    <Button style={{marginTop:"10px"}}
                    onClick    = {buttonSubmit.handleClose || _handleClose} 
                    loading    = {buttonSubmit.loading     || false}
                    appearance = {buttonSubmit.appearance  || "primary"}
                    color      = {buttonSubmit.color       || "blue"}
                    >
                        {buttonSubmit.title || "Close"}
                    </Button>
                }
                </Modal.Footer>
            </Modal>
        </div>
    )
}


export default MyModal
