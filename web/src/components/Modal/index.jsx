import { Modal, Button, ButtonToolbar } from 'rsuite'

import styles from './Modal.module.css'


const MyModal = (props) => {
    const { 
        config={}, 
        components={},
        setComponent=undefined,
        children=undefined, 
        buttonOpen=undefined,
        style={} 
    } = props
    // console.log("Modal ... ", components, setComponent)


    return (
        <div className={styles.modal} style={style}>
            <ButtonToolbar>
                {buttonOpen}
            </ButtonToolbar>
            <Modal open={components.modal} onClose={() => setComponent('modal',false)} >
                <Modal.Header>
                    <Modal.Title>{config.title||'Detalhes'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setComponent('modal',false)} appearance="primary">
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}


export default MyModal
