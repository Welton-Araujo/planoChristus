import { Button, ButtonToolbar } from "rsuite"
import MyModal from "../index"
import styles  from './ConfirmModal.module.css'


const ConfirmModal = (props) =>{
    const { 
        id = "confirmModal",
        config = {title:"OPERAÇÃO"},
        buttonOpen={disabled:false},
        buttonSubmit={disabled:true},
        buttonConfirm={title:"",loading:false},
        buttonCancel ={titel:""},
        customState = {},
        style  = {}
    } = props    
    // console.log('ConfirmModal ### ', id, buttonConfirm)

    //STATE VIA SAGA(REDUX):
    const { 
        //MyModal
        component,
        handleOpen,
        handleClose,
        //ConfirmModal
        handleConfirm,
        handleCancel, 
    } = customState

    return(
        <MyModal style={{}}
        id={id}
        config={{title: config.title || "OPERAÇÃO"}}
        buttonOpen={{...buttonOpen}}
        buttonSubmit={{...buttonSubmit}}
        customState={{
            component,
            handleOpen: handleOpen, 
            handleClose: handleClose || handleCancel,
        }} >
            <div className={styles.confirmModal}>
                <div className={styles.cmBody}>
                    <h6>{config.message || "Deseja confirmar?"}</h6>
                </div>
                <div className={styles.cmFooter}>
                    <ButtonToolbar>
                        <Button className={styles.cmBtnCancel} style={style.buttonCancel}
                        onClick={handleCancel} >
                            {buttonCancel.title  || <span className="mdi mdi-cancel"></span>}
                        </Button>
                        <Button className={styles.cmBtnConfirm} style={style.buttonConfirm}
                        loading={buttonConfirm.loading}
                        onClick={handleConfirm} >
                            {buttonConfirm.title || <span className="mdi mdi-check"></span>}
                        </Button>
                    </ButtonToolbar>
                </div>
            </div>
        </MyModal>
    )
}

export default ConfirmModal