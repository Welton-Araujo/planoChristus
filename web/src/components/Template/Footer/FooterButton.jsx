import styles from './Footer.module.css'

import { 
    buttonFooterInfo as bf 
} from '../../../constants/templates/footer'


export default function FooterButton(props){
    const { companyInfo={}, style={} } = props
    const button    = style ? style.button : {}
    const date      = new Date().getFullYear()
    // console.log('Footer button', button)

    return(
        <div className={styles.buttonFooter} style={button}>
            <span>
                Copyright© {date} - {companyInfo.fantasyName}®<br/> 
                Desenvolvido por <a href={bf.dev.src} target='_blank' rel="noreferrer">{bf.dev.description}®</a>
            </span>
        </div>        
    )
}
