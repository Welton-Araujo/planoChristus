import { 
    useDispatch, 
    useSelector,
} from 'react-redux'
import { Button } from 'rsuite'

import useEffectDispatch from '../../hooks/UseEffect'
import { 
    allClient, 
    addClient,
    filterClient,
    updateClient, 
    resetClient, 
} from '../../store/modules/client/actions'

import styles      from './Client.module.css'
import FormClient  from './FormClient'
import Table       from '../../components/Table'
import TableOneRow from '../../components/TableOneRow'
import MyDrawer    from '../../components/Drawer'
import Modal       from '../../components/Modal'

import clientTable from '../../data/componentTest/clientTable.json' 


const Client = (props)=>{
    const { style } = props
    // console.log('Client', clientTable)

    const { clients, client, form, components, behavior } = useSelector((state)=>state.CLIENT)
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
        dispatch(addClient())
    }
    useEffectDispatch(allClient, null, clients)

    return(
        <div className={`content ${styles.clientContent}`}>  
            {/* CLIENT HEADER */}
            <div className={styles.clientHeader}>
                <h1>Clientes</h1>
                {/* Client Panel */}
                <div className={styles.clientPanel}>
                    {/* Drawer */}
                    <MyDrawer className={styles.clientDrawer} style={{}}
                    id={'drawer-client'}
                    title={behavior==='create'?"Novo cliente":"Atualizar cliente"} 
                    placement={'left'}
                    buttonOpen={{
                        title: <span className="mdi mdi-account-plus"></span>,                        
                    }}
                    buttonSubmit={{
                        disabled: false,
                        title:<span className="mdi mdi-exit-to-app"> Sair</span>,                        
                    }} 
                    customState={{
                        component: components.drawer,
                        handleOpen:()=>{
                            dispatch(updateClient({ behavior:'create' }))
                            dispatch(resetClient())
                            setComponent('drawer',{id:'drawer-client', open:true})
                        },
                        handleClose:()=>setComponent('drawer',{id:null, open:false})
                    }} 
                    >
                        {/* DrawerContent::Search */}
                        <div className={`${styles.clientSearch}`}>
                            <div className={"form-group"}>
                                <b>E-mail</b>
                                <div className="input-group">
                                    <input
                                    className="form-control"
                                    name={"search"}
                                    type={'search'}
                                    placeholder="E-mail"
                                    defaultValue={client.email}
                                    autoFocus={true}
                                    onChange={(e)=>setClient('email', e.target.value)}
                                    onKeyUp={(e)=>{(e.key==="Enter") && dispatch(filterClient())}}
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
                        {/* DrawerContent::Form */}
                        <FormClient
                        page={client}
                        form={form}
                        setPage={setClient}
                        buttonSubmit={{
                            title:<span className="mdi mdi-zip-disk"> Salvar</span>,
                            loading: form.saving,
                            onClick: ()=>{
                                if(behavior==='create'){
                                    save()
                                }else{
                                    // 
                                }
                            },
                            style:{backgroundColor: behavior==="create" ? "var(--success)":"var(--warning)"}
                        }}  
                        />
                    </MyDrawer>
                </div>
            </div>
            {/* CLIENT BODY */}
            <div className={styles.clientBody} style={style}>
                <Table 
                loading={form.filtering}
                data={clients}
                config={clientTable.config}
                onRowClick={(rowData)=>{
                    // dispatch(updateClient({ behavior:'update', form:{ ...form, disabled:false} }))
                    // dispatch(updateClient({ client:rowData }))
                    // setComponent('drawer', true)
                }}
                actions={(rowData)=>{
                    return(
                        <>
                        <a href={"#"} style={{display:"flex", width:"100%", textDecoration:"none"}}>
                            <span className="mdi mdi-account-edit" 
                            style={{
                                display:"flex", 
                                justifyContent:"center",
                                width:"100%", 
                                marginRight:"5px", 
                                borderRadius:"6px",
                                fontSize:"21px",
                                color:'var(--rs-text-link-hover)', 
                                backgroundColor:"var(--light-gray)"
                            }}
                            onClick={(e) =>{
                                dispatch(updateClient({ client:rowData, behavior:'update', form:{ ...form, disabled:false} }))
                                setComponent('drawer',{id:'drawer-client',open:true})                                                              
                            }}>
                            </span>                                
                        </a>
                        <Modal style={{}}
                        id={rowData.id}                        
                        config={{title:'DETALHES'}}
                        buttonOpen={{
                            title:<span className="mdi mdi-eye"></span>,
                        }}
                        buttonSubmit={{
                            title:<span className="mdi mdi-exit-to-app"></span>,
                        }}
                        // customState={{
                        //     component: components.modal,
                        //     handleOpen:()=>{
                        //         setComponent('modal',{id:rowData.id, open:true})
                        //     },
                        //     handleClose:()=>setComponent('modal',{id:null, open:false})
                        // }}
                        >
                            <TableOneRow objData={rowData}
                            config={{
                                uppercase: false, 
                                rootLabel: true,
                                char: '.',
                                ignore:[ '_id', '__v', 'salonClient', 'geo.type'] 
                            }}
                            />
                        </Modal>
                        </>
                    )
                }}/>
            </div>
        </div>   
    )
}


export default Client