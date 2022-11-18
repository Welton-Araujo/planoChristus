import { useState } from "react"
import { Modal, Button, ButtonToolbar } from 'rsuite'

import styles from './Modal.module.css'


const MyModal = (props) => {
    const { 
        config={}, 
        children=undefined,
        buttonOpen={},
        buttonSubmit={},
        style={} 
    } = props
    
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)    
    // console.log("ModalState ##### ", buttonOpen, buttonOpen.onClick)

    return (
        <div className={styles.modal} style={style}>
            <ButtonToolbar>
                <Button onClick={buttonOpen.onClick || handleOpen}>
                    {buttonOpen.title||'Open'}
                </Button>
            </ButtonToolbar>

            <Modal open={open} onClose={handleClose} >
                <Modal.Header>
                    <Modal.Title>{config.title||'Detalhes'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                    loading={buttonSubmit.loading||false}
                    onClick={buttonSubmit.onClick||handleClose} 
                    appearance={buttonSubmit.appearance||"primary"}>
                        {buttonSubmit.title||'Close'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}


export default MyModal
