// import { useState } from "react"
import { Table } from "rsuite"
import "./Table.css"
import styles from "./Table.module.css"

const { Column, HeaderCell, Cell } = Table


const MyTable = (props) => {
    const { 
        loading=false, 
        data=[{}], 
        config={}, 
        actions=undefined, 
        onRowClick=undefined,
        // setComponent=undefined, 
        children=undefined
    } = props
    const { main:{style={}}, header=[] } = config
    // console.log('MyTable ... #### ', loading, data)
    
    //MUDAR DE _ID PARA ID:
    const newData = data.map((item)=>({ ...item, id:(item._id||item.id) }))

    // const [autoHeight, setAutoHeight] = useState(true)

    return (
        <Table className={styles.table} style={style} 
        loading={loading}
        height={style.height}
        data={newData}
        // autoHeight={autoHeight}
        rowExpandedHeight={440}
        onRowClick={onRowClick}>
        {   
            header.map(({label, fixed, style},i) => (
                <Column key={`${i}`} flexGrow={style.width ? 0:1} width={style.width} align={style.align} fixed={fixed}>
                    <HeaderCell >{label.toLocaleUpperCase()}</HeaderCell>
                    <Cell dataKey={label} />
                </Column>
            ))       
        }
            <Column width={100} fixed={"right"} style={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
                <HeaderCell>...</HeaderCell>
                <Cell style={{padding:'0px'}}>
                    {actions}
                </Cell>
            </Column>

            { children ?
                <Column width={50} fixed="right" >
                    <HeaderCell>{children && '...'}</HeaderCell>
                    <Cell style={{padding:'0px'}}>
                       {children}
                    </Cell>
                </Column>            
                : false
            }
        </Table>
    )
}


export default MyTable
