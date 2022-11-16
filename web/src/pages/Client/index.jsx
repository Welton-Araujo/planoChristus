import { 
    useDispatch, 
    useSelector,
} from 'react-redux'
import { Button } from 'rsuite'

import useEffectDispatch from '../../hooks/UseEffect'
import { 
    allClient, 
    updateClient, 
    filterClient 
} from '../../store/modules/client/actions'

import styles from './Client.module.css'
import Table from '../../components/Table'
import TableOneRow from '../../components/TableOneRow'
import Modal from '../../components/Modal/ModalUseState'
// import Modal from '../../components/Modal'

import clientTable from '../../data/componentTest/clientTable.json' 
import { formFields } from '../../constants/pages/scheduling'


const Client = (props)=>{
    const { style } = props
    // console.log('Client', clientTable)

    const { clients, client, form, components, behavior } = useSelector((state)=>state.client)
    // console.log('CLIENT ############', client)
        
    const dispatch     = useDispatch()
    const setComponent = (component, state) =>{
        dispatch(updateClient({ components:{ ...components, [component]:state } }))
    }
    const setClient = (key, value) =>{
        dispatch(updateClient({ client:{ ...client, [key]:value } }))
    }
    useEffectDispatch(allClient, null, clients)

    return(
        <div className={`content ${styles.clientContent}`}>            
            <div className={styles.clientHeader}>
                <h1>Clientes</h1>
                <Modal
                config={{
                    title:behavior==='create' ? "Criar...":"Atualizar...", 
                    buttonOpen:<span className="mdi mdi-account-plus"></span>,
                    buttonClose:"Fechar"
                }} 
                components={components}
                setComponent={setComponent} 
                style={{}}>
                    <div className="clientSearch">
                        <div className={"form-group col-12 mb-3"}>
                            <b>E-mail</b>
                            <div className="input-group">
                                <input
                                className="form-control"
                                type={'email'}
                                placeholder="E-mail"
                                defaultValue={client.email}
                                onChange={(e)=>setClient('email', e.target.value)}
                                />
                                <div className="input-group-append ">
                                    <Button
                                    appearance="primary"
                                    loading={form.filtering}
                                    disabled={form.filtering}
                                    onClick={()=>dispatch(filterClient())}
                                    >
                                        <span className="mdi mdi-magnify"></span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="clientResultForm">
                        {constructFormResult(client, form, setClient)}                        
                    </div>                
                </Modal>
            </div>
            <div className={styles.clientBody} style={style}>
                <Table 
                loading={form.filtering}
                data={clients} 
                config={clientTable.config} 
                onRowClick={onRowClick} 
                actions={actions(components, setComponent)} 
                // setComponent={setComponent}
                >
                    {/* <button onClick={()=>setComponent('modal',true)} style={{display:"flex",padding:"5px"}}>{'Ver'}</button>*/}
                </Table>
            </div>
        </div>   
    )
}

const onRowClick = (rowData) => {
    console.log('Client onRowClick ...',rowData)
    return 
}

const actions = (components, setComponent=undefined)=>{
    return (rowData) => {
        // console.log('Client actions ...',rowData)
        return(
            <div style={{display:"flex"}}>
                <a href={"/"} onClick={() => alert(`id:${rowData.id||rowData._id}`)} style={{color:'var(--rs-text-link-hover)', marginRight:"5px"}}>
                    <span className="mdi mdi-account-edit" style={{fontSize:"21px"}}> </span>
                </a>
                <Modal 
                config={{title:'DETALHES', nameButton:<span className="mdi mdi-eye"></span>}} 
                components={components}
                setComponent={setComponent} 
                style={{}}>
                    <TableOneRow objData={rowData}/>
                </Modal>
            </div>        
        )
    }
}

const constructFormResult = (client, form, setClient, _fields=[])=>{
    //INPUTS:
    const resultFields = formFields.map((f,i)=>{
        return(
            <div key={`${i}-${f.key}`} className="form-group col-6 py-2">
                <b>{f.title}</b>
                <input
                className="form-control"
                type={'text'}
                placeholder={f.placeholder}
                disabled={form.disabled}
                value={client[f.key]}
                onChange={(e)=>setClient(f.key, e.target.value)}
                />                
            </div>
        )
    })
    
    //OUTROS CAMPOS:
    const sel = <div key={`00-sex`} className="form-group col-6 py-2">
                    <b>{'Sexo'}</b>
                    <select
                    className="form-control"
                    disabled={form.disabled}
                    defaultValue={client.sex}
                    onChange={(e)=>setClient('sex', e.target.value)}
                    >
                        <option defaultValue={"M"}>Masculino</option>
                        <option defaultValue={"F"}>Feminino</option>
                    </select>
                </div>

    resultFields.push(sel)

    return resultFields
}


export default Client