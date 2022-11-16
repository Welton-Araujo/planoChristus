import { 
    useDispatch, 
    useSelector,
} from 'react-redux'

import useEffectDispatch from '../../hooks/UseEffect'
import { allClient, updateClient } from '../../store/modules/client/actions'

import styles from './Client.module.css'
import Drawer from "../../components/Drawer"
import Table from '../../components/Table'
import TableOneRow from '../../components/TableOneRow'
import Modal from '../../components/Modal'

import clientTable from '../../data/componentTest/clientTable.json' 


const Client = (props)=>{
    const { style } = props
    // console.log('Client', clientTable)

    const { clients, client, form, components, behavior } = useSelector((state)=>state.client)
    // console.log('CLIENT ############', clients, components, client)
        
    const dispatch     = useDispatch()
    const setComponent = (component, state) =>{
        dispatch(updateClient({ components:{ ...components, [component]:state } }))
    }

    useEffectDispatch(allClient, null, clients)

    return(
        <div className={`content ${styles.clientContent}`}>
            <Drawer title={'Clientes'} style={{with:"80%"}}
            behavior={behavior}
            components={components}
            setComponent={setComponent}
            >
                <div className={""}>
                    <h3>{behavior==='create' ? "Criar...":"Atualizar..."}</h3>
                </div>     
            </Drawer>
            <div className={styles.clientHeader}>
                <h1>Clientes</h1>
                <button className="btn btn-primary btn-lg"
                onClick={()=>{
                    dispatch(updateClient({ behavior:'create' }))
                    setComponent('drawer',true)
                }}
                >
                    <span className="mdi mdi-account-plus"></span>
                </button>
            </div>
            <div className={styles.clientBody} style={style}>
                <Table 
                loading={form.filtering}
                data={clients} 
                config={clientTable.config} 
                onRowClick={onRowClick} 
                actions={actions} 
                />
            </div>
        </div>   
    )
}

const onRowClick = (rowData) => {
    console.log('Client ...',rowData)
    return 
}

const actions = (rowData) => {
    return(
        <div style={{display:"flex"}}>
            <a href={"/"} onClick={() => alert(`id:${rowData.id||rowData._id}`)} style={{color:'var(--rs-text-link-hover)', marginRight:"5px"}}>
                <span className="mdi mdi-account-edit" style={{fontSize:"21px"}}> </span>
            </a>
            <Modal config={{title:'DETALHES', nameButton:"VER"}} style={{}}>
                <TableOneRow objData={rowData}/>
            </Modal>
        </div>
        
    )
}


export default Client