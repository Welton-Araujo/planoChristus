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
import MyDrawer from '../../components/Drawer'
import ModalState from '../../components/Modal/ModalUseState'
// import Modal from '../../components/Modal'
import MyForm from '../../components/Form'

import clientTable from '../../data/componentTest/clientTable.json' 
import { formInfo } from '../../constants/pages/client'


const Client = (props)=>{
    const { style } = props
    // console.log('Client', clientTable)

    const { clients, client, form, components, behavior } = useSelector((state)=>state.client)
    // console.log('CLIENT ############',  styles)
        
    //FUNCOES:
    const dispatch     = useDispatch()
    const setComponent = (component, state) =>{
        dispatch(updateClient({ components:{ ...components, [component]:state } }))
    }
    const setClient = (key, value) =>{
        dispatch(updateClient({ client:{ ...client, [key]:value } }))
    }
    const save = () =>{
        console.log('save...')
    }
    useEffectDispatch(allClient, null, clients)

    return(
        <div className={`content ${styles.clientContent}`}>            
            <div className={styles.clientHeader}>
                <h1>Clientes</h1>
                <div className={styles.clientPanel}>
                    <button className="btn btn-primary btn-lg"
                    onClick={()=>{
                        dispatch(updateClient({ behavior:'create' }))
                        setComponent('drawer',true)
                    }}
                    >
                        <span className="mdi mdi-account-plus"></span>
                    </button>

                    <MyDrawer className={styles.drawerClient} style={{}}
                    title={behavior==='create'?"Novo cliente":"Atualizar cliente"} 
                    placement={'left'}
                    buttonSubmit={{
                        title:<span className="mdi mdi-zip-disk">Salvar</span>,
                        // loading:true,
                        onClick:save,
                        appearance:"",
                        // style:{with:"100%"}
                    }}
                    behavior={behavior}
                    components={components}
                    setComponent={setComponent}
                    >
                        <div className={`${styles.clientSearch}`}>
                            <div className={"form-group"}>
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
                        {/* {formBuilder(client, form, setClient, formInfo)} */}
                        <MyForm
                            page={client}
                            form={form}
                            setPage={setClient}
                            formInfo={formInfo}
                        />
                    </MyDrawer>
                </div>
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
                <ModalState 
                config={{title:'DETALHES'}} 
                buttonOpen={{
                    title:<span className="mdi mdi-eye"></span>,
                    onClick:null
                }}
                buttonSubmit={{
                    title:<span className="mdi mdi-exit-to-app"></span>,
                    // loading:true,
                    onClick:null,
                    appearance:""
                }}
                components={components}
                setComponent={setComponent} 
                style={{}}>
                    <TableOneRow objData={rowData}/>
                </ModalState>
            </div>        
        )
    }
}


export default Client