import { Modal, Button, ButtonToolbar } from 'rsuite'

import styles from './Modal.module.css'


const MyModal = (props) => {
    const { 
        config={}, 
        components={},
        setComponent=undefined,
        children=undefined, 
        buttonOpen={},
        buttonSubmit={},
        style={} 
    } = props
    console.log("Modal ... ", components, buttonOpen)

    const handleOpen  = ()=>setComponent('modal', true)
    const handleClose = ()=>setComponent('modal', false)

    return (
        <div className={styles.modal} style={style}>
            <ButtonToolbar>
                <Button onClick={buttonOpen.onClick || handleOpen}>
                    {buttonOpen.title||'Open'}
                </Button>
            </ButtonToolbar>

            <Modal open={components.modal} onClose={handleClose} >
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
