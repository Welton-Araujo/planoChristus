import { useState } from "react"
import { Modal, Button, ButtonToolbar } from 'rsuite'

let openModal  = null
let closeModal = null

const MyModal = (props) => {
    const { title, nameButton, content, children, style } = props
    console.log("Modal", content, children, style)

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    openModal  = handleOpen
    closeModal = handleClose

    return (
        <div className="">
            <ButtonToolbar>
                <Button onClick={handleOpen}>{nameButton||'Ver'}</Button>
            </ButtonToolbar>

            <Modal open={open} onClose={handleClose} >
                <Modal.Header>
                    <Modal.Title>{title||'Detalhes'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {content}
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
