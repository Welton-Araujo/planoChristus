import { Button, ButtonToolbar } from "rsuite"
import MyModal from "../index"
import styles  from './ConfirmModal.module.css'


const ConfirmModal = (props) =>{
    const { 
        id = "confirmModal",
        config = {title:"OPERAÇÃO"},
        component = {},
        buttonOpen = {disabled:false},
        buttonConfirm = {title:"",loading:false},
        buttonCancel = {titel:""},
        style = {}
    } = props    
    // console.log('ConfirmModal ### ', id, buttonConfirm)

    return(
        <MyModal
        id={id}
        config={{title: config.title || "OPERAÇÃO"}}
        component={component}
        buttonOpen={buttonOpen}
        buttonSubmit={{
            disabled:true,
            handleClose:buttonCancel.handleCancel
        }} 
        style={style.myModal} 
        >
            {/* MyModal: Content */}
            <div className={styles.confirmModal} style={style.cmModal}>
                <div className={styles.cmBody}>
                    <h6>{config.message || "Deseja confirmar?"}</h6>
                </div>
                <div className={styles.cmFooter}>
                    <ButtonToolbar>
                        <Button className={styles.cmBtnCancel} style={buttonCancel.style}
                        onClick={buttonCancel.handleCancel} >
                            {buttonCancel.title  || <span className="mdi mdi-cancel"></span>}
                        </Button>
                        <Button className={styles.cmBtnConfirm} style={buttonConfirm.style}
                        loading={buttonConfirm.loading}
                        onClick={buttonConfirm.handleConfirm} >
                            {buttonConfirm.title || <span className="mdi mdi-check"></span>}
                        </Button>
                    </ButtonToolbar>
                </div>
            </div>
        </MyModal>
    )
}

export default ConfirmModal