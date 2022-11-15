import styles from './Footer.module.css'

import FooterMainCompany from './FooterMainCompany'
import FooterMainContent from './FooterMainContent'

// import companyInfo from '../../../data/companyInfo.json'


export default function FooterMain(props){
    const { companyInfo={}, style={} } = props
    const main      = style ? style.main : {}
    // console.log('Footer main', main)    

    return(
        <div className={styles.mainFooter} style={main}>
            <FooterMainCompany companyInfo={companyInfo}/>
            <FooterMainContent companyInfo={companyInfo}/>
        </div>
    )
}
