import { useState } from "react"
import { Modal, Button, ButtonToolbar } from 'rsuite'

import styles from './Modal.module.css'


const MyModal = (props) => {
    const { 
        config={}, 
        children=undefined, 
        style={} 
    } = props
    // console.log("Modal ... ", children, style)

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)


    return (
        <div className={styles.modal} style={style}>
            <ButtonToolbar>
                <Button onClick={handleOpen}>{config.buttonOpen||'Ver'}</Button>
            </ButtonToolbar>

            <Modal open={open} onClose={handleClose} >
                <Modal.Header>
                    <Modal.Title>{config.title||'Detalhes'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} appearance="primary">
                        {config.buttonClose||'Fechar'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}


export default MyModal
