import styles from './Alert.module.css'


const Alert = (props) =>{
    const{
        id="alert",
        className="",
        actived=false,
        config={
            title:<span className="mdi mdi-alert"> ALERTA</span>,
            message:"Aviso importante",
            style:{}
        },
        style={}
    } = props
    console.log('Alert ### actived', actived)

    return<>
        { actived ?
            <div id={id} className={`${styles.alert} ${className}`} style={style} >
                <b className={styles.alertTitle} style={config.style}>
                    {config.title}
                </b>
                <div className={styles.alertMessage} style={config.style}>
                    {config.message}
                </div>
            </div>
        :   false
        }
    </>
    
}

export default Alert