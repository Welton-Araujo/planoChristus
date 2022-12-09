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
    } = props
    const { 
        style:styleConf={},
        header=[] 
    } = config
    console.log('MyTable #### ', config, styleConf)
    
    //MUDAR DE _ID PARA ID:
    const newData  = data.map((item)=>({ ...item, id:(item._id||item.id) }))

    return (
        <Table className={styles.table} style={styleConf} 
        loading={loading}
        height={styleConf.height}
        data={newData}
        // autoHeight={autoHeight}
        rowExpandedHeight={440}
        onRowClick={onRowClick}>
        {   
        header.map(({label, key, content, fixed, style},i) => (
            <Column key={`${i}`} flexGrow={style.width ? 0:1} width={style.width} align={style.align} fixed={fixed}>
                <HeaderCell >{getFormattedLabel(label)}</HeaderCell>
                {   
                    content 
                    ? <Cell>{ content }</Cell>
                    : <Cell dataKey={key} />
                }
                
            </Column>
        ))       
        }
            <Column width={100} fixed={"right"} style={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
                <HeaderCell>...</HeaderCell>
                <Cell style={{padding:'0px'}}>
                    {actions}
                </Cell>
            </Column>
        </Table>
    )
}

const getFormattedLabel = (label='FIELD') =>{
    const slicedLabel   = label.toLocaleUpperCase().split('.')
    const formatedLabel = (slicedLabel.length === 1) ? slicedLabel[0] : slicedLabel[1]
    return formatedLabel
}


export default MyTable
