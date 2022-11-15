import { useState } from "react"
import { Modal, Button, ButtonToolbar } from 'rsuite'

import styles from './Modal.module.css'

let openModal  = null
let closeModal = null


const MyModal = (props) => {
    const { config={}, children, style } = props
    // console.log("Modal ... ", children, style)

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    openModal  = handleOpen
    closeModal = handleClose

    return (
        <div className={styles.modal} style={style}>
            <ButtonToolbar>
                <Button onClick={handleOpen}>{config.nameButton||'Ver'}</Button>
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
                        Ok
                    </Button>
                    {/* <Button onClick={handleClose} appearance="subtle">
                        Cancelar
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export {openModal, closeModal}

export default MyModal
