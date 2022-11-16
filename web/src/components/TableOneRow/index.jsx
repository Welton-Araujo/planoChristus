import styles from './TableOneRow.module.css'


const TableOneRow = (props) =>{
    const { objData={}, style={} } = props
    // console.log('TableOneRow ....', objData, style)

    return formatTable(objData)
}

export const formatTable = (obj)=>{
    let items = []
    for(const key in obj) {
        if(typeof(obj[key]) ==='object') continue
        items.push(formatContent(key, obj[key]))
    }
    return(
        <div className={styles.tableOneRow}>
            {items}
        </div>
    ) 
}

const formatContent = (key, value)=>{
    return(
        <div className={styles.tableCell} key={Math.random()}>
            <span className={styles.cellTitle}  >{key}</span>
            <small className={styles.cellValue} >{value} </small>
        </div>
    )
}

export default TableOneRow