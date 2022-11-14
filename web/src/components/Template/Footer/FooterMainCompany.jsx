import styles from './Footer.module.css'

import { 
    mainFooter1 as f1,
} from '../../../constants/footer'


export default function Footer(props){
    const { companyInfo } = props
    
    return(
        <div className={styles.mainFooterCompany} style={{
            // backgroundColor:'inherit'
        }}>
            <h2>{companyInfo.fantasyName}</h2>
            <div className={styles.info}>
                <div className={styles.address}>
                    <span>{companyInfo.address.street} </span>
                    <span>nº {companyInfo.address.number}, </span>
                    <span>{companyInfo.address.district} - </span>
                    <span>{companyInfo.address.zipCode} </span><br/>
                    <span>{companyInfo.address.city}-</span>
                    <span>{companyInfo.address.state}, </span>
                    <span>{companyInfo.address.country}.</span>
                </div>
                <div className={styles.contact}>
                    <span>{companyInfo.address.phone} </span>
                    <span>{companyInfo.address.email} </span>
                </div>
            </div>
            { f1.items.map( (item, index) =>{
                return <h6 key={index}><a href={item.src}>{item.description}</a></h6>    
            })}
        </div>           
    )
}
