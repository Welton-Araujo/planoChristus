import { Table } from "rsuite"
import "./Table.css"
// import styles from "./Table.module.css"

const { Column, HeaderCell, Cell } = Table


const MyTable = (props) => {
    let { data, config, actions, onRowClick, style } = props
    // console.log('MyTable ... ', data, config)
    //MUDAR DE _ID PARA ID:
    data = data.map((item)=>({ ...item, id:(item._id||item.id) }))

    return (
        <Table className={"table"} style={style} 
        height={config.main.style.height}
        data={data}
        onRowClick={onRowClick}>
        {   
            config.header.map(({label, fixed, style},i) => (
                <Column key={`${i}`} flexGrow={style.width ? 1:0} width={style.width} align={style.align} fixed={fixed}>
                    <HeaderCell >{label.toLocaleUpperCase()}</HeaderCell>
                    <Cell dataKey={label} />
                </Column>
            ))       
        }
            <Column width={80} fixed="right" >
                <HeaderCell>AÇÕES</HeaderCell>
                <Cell style={{padding:'4px'}}>{actions}</Cell>
            </Column>
        </Table>
    )
}


export default MyTable
