import { Link } from 'react-router-dom'
import logoPic from '../../../assets/img/logo.png'

import styles from './Logo.module.css'


const Logo = (props)=>{
    const { 
        title="Título", 
        splitTitle="Subtítulo", 
        subtitle="Slogan", 
        link="/",
        img={
            alt:"Image",
            with:"55px",
            height:"65px"
        }, 
        style={}, 
    } = props
    
    return(
        <div className={styles.logo} style={style}>
            <Link 
            to={link}            
            >
                <div className={styles.boxImg}>
                    <img src={logoPic} alt={img.alt} width={img.width} height={img.height} />
                </div>
                <div className={styles.info}>
                    <small className={styles.title}>{title} <span>{splitTitle}</span></small>
                    <span className={styles.subtitle}>{subtitle}</span>
                </div>
            </Link>
        </div>
    )
}

export default Logo