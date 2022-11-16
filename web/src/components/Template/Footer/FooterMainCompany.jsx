import styles from './Footer.module.css'

import { 
    mainFooter1 as f1,
} from '../../../constants/templates/footer'


export default function Footer(props){
    const { companyInfo={} } = props
    const { address={} } = companyInfo
    return(
        <div className={styles.mainFooterCompany} style={{
            // backgroundColor:'inherit'
        }}>
            <h2>{companyInfo.fantasyName}</h2>
            <div className={styles.info}>
                <div className={styles.address}>
                    <span>{address.street} </span>
                    <span>nº {address.number}, </span>
                    <span>{address.district} - </span>
                    <span>{address.zipCode} </span><br/>
                    <span>{address.city}-</span>
                    <span>{address.state}, </span>
                    <span>{address.country}.</span>
                </div>
                <div className={styles.contact}>
                    <span>{address.phone} </span>
                    <span>{address.email} </span>
                </div>
            </div>
            { f1.items.map( (item, index) =>{
                return <h6 key={index}><a href={item.src}>{item.description}</a></h6>    
            })}
        </div>           
    )
}
