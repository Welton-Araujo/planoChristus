import { Modal, Button, ButtonToolbar } from 'rsuite'

import styles from './Modal.module.css'


const MyModal = (props) => {
    const { 
        config={}, 
        id=null,
        components=undefined,
        setComponent=undefined,
        children=undefined, 
        buttonOpen={},
        buttonSubmit={},
        style={} 
    } = props

    const { modal=[] } = components    
    // console.log("Modal ... ", id, modal, )

    const handleOpen  = ()=>setComponent('modal', { id:id, open:true  })
    const handleClose = ()=>setComponent('modal', { id:0 , open:false })

    return (
        <div className={styles.modal} style={style}>
            <ButtonToolbar>
                <Button style={{color:"inherit"}}
                    appearance={buttonOpen.appearance||"default"}
                    onClick={buttonOpen.onClick || handleOpen}>
                    {buttonOpen.title||'Open'}
                </Button>
            </ButtonToolbar>

            <Modal open={modal.id===id} onClose={handleClose} >
                <Modal.Header>
                    <Modal.Title>{config.title||'Detalhes'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{marginTop:"10px"}}
                    loading={buttonSubmit.loading||false}
                    onClick={buttonSubmit.onClick||handleClose} 
                    appearance={buttonSubmit.appearance||"primary"}>
                        {buttonSubmit.title||"Close"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}


export default MyModal
