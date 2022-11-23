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
    unlinkClient,
} from '../../store/modules/client/actions'

import styles      from './Client.module.css'
import FormClient  from './FormClient'
import Table       from '../../components/Table'
import TableOneRow from '../../components/TableOneRow'
import MyDrawer    from '../../components/Drawer'
import Modal       from '../../components/Modal'
import ConfirmModal from '../../components/Modal/ConfirmModal'

import clientTable from '../../data/componentTest/clientTable.json' 

let stap = 0


const Client = (props)=>{
    const { style } = props
    // console.log('Client', clientTable)
    
    //STATE: inicial=[] e atualizado=[...]
    const { all, current, form, components, behavior } = useSelector((state)=>state.client)
    console.log('CLIENT #### ', )
        
    //FUNCOES:
    const dispatch     = useDispatch()
    const setComponent = (component, state) =>{
        dispatch(updateClient({ components:{ ...components, [component]:state } }))
    }
    const setClient = (key, value) =>{
        dispatch(updateClient({ current:{ ...current, [key]:value } }))
    }
    const save = () =>{
        dispatch(addClient())
    }
    const remove = () =>{
        dispatch(unlinkClient())
    }
    // ATUALIZAR STATE NO LOAD DA PAGE: API
    useEffectDispatch(allClient, null, load(all))

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
                    }} >
                        {/* DrawerContent:: Search */}
                        <div className={`${styles.clientSearch}`}>
                            <div className={"form-group"}>
                                <b>E-mail</b>
                                <div className="input-group">
                                    <input
                                    className="form-control"
                                    name={"search"}
                                    type={'search'}
                                    placeholder="E-mail"
                                    defaultValue={current.email}
                                    autoFocus={true}
                                    onChange={(e)=>setClient('email', e.target.value)}
                                    onKeyUp={(e)=>{
                                        if(e.key==="Enter"){
                                            dispatch(filterClient())
                                            dispatch(resetClient())
                                        }
                                    }}
                                    />
                                    <div className="input-group-append ">
                                        <Button
                                        appearance="primary"
                                        loading={form.filtering}
                                        disabled={form.filtering}
                                        onClick={()=>{
                                            dispatch(filterClient())
                                            dispatch(resetClient())
                                        }} >
                                            <span className="mdi mdi-magnify"></span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* DrawerContent:: Form */}
                        <FormClient                        
                        page={current}
                        form={form}
                        behavior={behavior}
                        setPage={setClient}
                        buttonSubmit={{
                            title:   <span className="mdi mdi-zip-disk"> { behavior==='create' ? "Salvar":"Deletar" }</span>,
                            loading: form.saving,
                            onClick: ()=>{ (behavior==='create') ? save() : setComponent('modal',{id:"cmClientRemove", open:true}) },
                            style: { backgroundColor: (behavior==='create') ? "var(--success)":"var(--warning)" }
                        }}
                        />
                        {/* DrawerContent:: ConfirmModal : cm */}
                        <ConfirmModal id={"cmClientRemove"}
                        config = {{ title:'CANCELAR SERVIÇO', message:"Confirmar operação?" }}
                        buttonConfirm={{title:"",loading:form.saving}}
                        buttonCancel ={{titel:""}}
                        customState={{
                            component: components.modal,
                            handleConfirm:()=>remove() ,
                            handleCancel :()=>setComponent('modal',{id:null, open:false})
                        }}
                        style={{ buttonConfirm:{borderRadius:"11px"}, buttonCancel:{ } }}
                        />                        
                    </MyDrawer>
                </div>
            </div>
            {/* CLIENT BODY */}
            <div className={styles.clientBody} style={style}>
                <Table 
                loading={form.filtering}
                data={all}
                config={clientTable.config}
                onRowClick={(rowData)=>{
                    // dispatch(updateClient({ behavior:'update', form:{ ...form, disabled:false} }))
                    // dispatch(updateClient({ current:rowData }))
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
                                dispatch(updateClient({ current:rowData, behavior:'update', form:{ ...form, disabled:false} }))
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

const load = (all=[], qtd=0, attempts=0)=>{
    let ok = false
    //AUTORIZAR ENQUANTO VAZIO/MINIMO:
    if( all.length <= qtd ){ ok=true  }
    //PARA DEPOIS DO MAX DE PASSOS:
    if(  stap++ > attempts   ){ ok=false }
    return ok
}


export default Client