import { 
    // useDispatch, 
    useSelector,
} from 'react-redux'

import useEffectDispatch from '../../hooks/UseEffect'
import { allClient } from '../../store/modules/client/actions'

import './Client.css'
import Table from '../../components/Table'

import clientTable from '../../data/componentTest/clientTable.json' 


const Client = (props)=>{
    const { style } = props
    // console.log('Client', clientTable)

    const clients  = useSelector((state)=>state.client.payload)
    console.log('clients[]', clients)
    
    useEffectDispatch(allClient)

    return(
        <div className="content clientContent h-100">
            <div className="clientHeader">
                <h1>Clientes</h1>
                <button className="btn btn-primary btn-lg">
                    <span className="mdi mdi-account-plus"></span>
                </button>
            </div>
            <div className="clients" style={style}>
                <Table data={clients} config={clientTable.config} onRowClick={onRowClick} actions={actions} style={{}}/>
            </div>
        </div>   
    )
}

const onRowClick = (rowData) => {
    console.log('Client ...',rowData)
}

const actions = (rowData) => {
    // console.log('Client actions',rowData)
    return(
        <a href={"/"} onClick={() => alert(`id:${rowData.id||rowData._id}`)} style={{color:'var(--rs-text-link-hover)'}}>
        <span className="mdi mdi-account-edit" style={{fontSize:"21px"}}> </span>
        </a>
    )
}

export default Client