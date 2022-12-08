import styles from './TableOneRow.module.css'

import { flattenObj } from '../../utils/operations/object'


const TableOneRow = (props) =>{
    const { 
        config={},
        objData={}, 
        style={} 
    } = props
    
    const {
        uppercase=true,
        rootLabel=false, 
        char='.', 
        ignore=[] 
    } = config

    console.log('TableOneRow ....', objData)

    const flatData = flattenObj(objData, rootLabel, char, ignore)

    return(
        <div className={styles.tableOneRow} style={style}>
            {formatCells(flatData, uppercase)}
        </div>
    ) 
}

export const formatCells = (obj, uppercase)=>{
    // console.log('formatTable ######## ', obj)
    let items = []
    for(const key in obj) {
        const label = uppercase ? key.toUpperCase() : key
        items.push(formatContent(label, obj[key]))
    }
    return [ ...items ]     
}

const formatContent = (label="FIELD", value)=>{
    return(
        <div className={styles.tableCell} key={Math.random()}>
            <span className={styles.cellTitle}  >{label}</span>
            <small className={styles.cellValue} >{value} </small>
        </div>
    )
}


export default TableOneRow