import styles from './Footer.module.css'

import { 
    mainFooter2 as f2,
    mainFooter3 as f3,
    mainFooter4 as f4, 
} from '../../../constants/templates/footer'


export default function Footer(props){
    const { companyInfo={} } = props
    
    return(
        <div className={styles.mainFooterContent} style={{
            // backgroundColor:'inherit'
        }}>
            <div className={styles.navmenu}>
                <h2>{f2.title}</h2>
                { footerItemCreator(companyInfo.redeSocial) }
            </div>
            <div className={styles.navmenu}>
                <h2>{f3.title}</h2>
                { footerItemCreator(f3.items) }
            </div>
            <div className={styles.navmenu}>
                <h2>{f4.title}</h2>
                { footerItemCreator(f4.items) }
            </div>
        </div>   
    )
}

const footerItemCreator = (footerItems=[])=>{
    return footerItems.map( (item, index) =>{
        return <h6 key={index}><a href={item.src}>{item.description}</a></h6>    
    })
}