import styles from './Alert.module.css'


const Alert = (props) =>{
    const{
        id="alert",
        className="default",
        config={
            title:"ALERTA",
            message:<span className="mdi mdi-alert"> Aviso importante!</span>,
            style:{}
        },
        style={}
    } = props
    console.log('Alert ### ', id, className, config)

    return(
        <div id={id} className={`${styles.alert} `} style={style} >
            <b className={styles.alertTitle} style={config.style}>
                {config.title}
            </b>
            <div className={styles.alertMessage} style={config.style}>
                {config.message}
            </div>
        </div>
    )
}

export default Alert