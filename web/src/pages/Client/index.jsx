import { 
    useDispatch, 
    useSelector,
} from 'react-redux'
import { Button } from 'rsuite'

import useEffectDispatch from '../../hooks/UseEffect'
import { 
    // API
    allClient, 
    addClient,
    filterClient,
    updateClient,
    unlinkClient,

    // STATE LOCAL
    refreshClient, 
    resetClient, 
} from '../../store/modules/client/actions'

import styles      from './Client.module.css'
import FormClient  from './FormClient'
import MyTable     from '../../components/Table'
import TableOneRow from '../../components/TableOneRow'
import MyDrawer    from '../../components/Drawer'
import MyModal       from '../../components/Modal'
import ConfirmModal from '../../components/Modal/ConfirmModal'

// STATIC TEST
import loginFake   from '../../data/fakeReq/login.json' 
import clientTable from '../../data/componentTest/clientTable.json' 

const { name:salonName } = loginFake.salon
let stap = 0


const Client = (props)=>{
    const { style } = props
    // console.log('Client', clientTable)
    
    //STATE: inicial=[] e atualizado=[...]
    const { all, current, form, components, behavior } = useSelector((state)=>state.client)
    console.log('CLIENT #### ', current, all)
        
    //FUNCOES:
    const dispatch     = useDispatch()
    const setComponent = (component, state) =>{
        dispatch(refreshClient({ components:{ ...components, [component]:state } }))
    }
    const setClient = (key, value) =>{
        dispatch(refreshClient({ current:{ ...current, [key]:value } }))
    }
    const save = () =>{
        dispatch(addClient())
    }
    const update = () =>{
        console.log('update...')
        dispatch(updateClient())
    }
    const remove = () =>{
        console.log('remove...')
        dispatch(unlinkClient())
    }
    // ATUALIZAR STATE NO LOAD DA PAGE: API
    useEffectDispatch(allClient, null, load(all))

    return(
        <div className={`content ${styles.clientContent}`}>  
            {/* CLIENT HEADER */}
            <div className={styles.clientHeader}>
                <div className={styles.clientTitle}>
                    <h1>Clientes</h1>
                    <small>{salonName}</small>
                </div>
                {/* Client Panel */}
                <div className={styles.clientPanel}>
                    {/* Drawer */}
                    <MyDrawer className={styles.clientDrawer} style={{}}
                    id={'drawer-client'}
                    title={`${getBehavior(behavior).title} cliente`}
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
                            dispatch(refreshClient({ behavior:'create' }))
                            dispatch(resetClient())
                            setComponent('drawer',{id:'drawer-client', open:true})
                        },
                        handleClose:()=>setComponent('drawer',{id:null, open:false})
                    }} >
                        {/* Search */}
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
                        {/* Form */}
                        <FormClient                        
                        page={current}
                        form={form}
                        behavior={behavior}
                        setPage={setClient}
                        buttonSubmit={{
                            title:  <span className="mdi mdi-zip-disk">{getBehavior(behavior).title} </span>,
                            loading: form.saving,
                            onClick: ()=>{ 
                                if(behavior==='create'){
                                    save() 
                                }else if(behavior==='update'){
                                    update()
                                }else{
                                    setComponent('modal',{id:"cmClientRemove", open:true}) 
                                } 
                            },
                            style: { backgroundColor: getBehavior(behavior).color }
                        }}
                        />
                    </MyDrawer>                        
                </div>
            </div>
            {/* CLIENT BODY */}
            <div className={styles.clientBody} style={style}>
                <MyTable 
                loading={form.filtering}
                data={all}
                config={clientTable.config}
                onRowClick={(rowData)=>{
                    // dispatch(refreshClient({ current:rowData, behavior:'update', form:{ ...form, disabled:false} }))
                    // setComponent('drawer', {id:"drawer-client", open:true})
                }}
                actions={(rowData)=>{
                    return(
                        <>
                        <a href={"#"} 
                        style={{
                            display:"flex", 
                            justifyContent:"center",
                            alignItems: "center",
                            width:"100%", 
                            height: "35px",
                            // margin:"5px", 
                            padding: "8px 12px",
                            borderRadius:"6px",
                            fontSize:"16px",
                            textDecoration:"none",
                            color:"inherit", 
                            backgroundColor:"var(--rs-btn-default-bg)",
                        }}>
                            <span className="mdi mdi-account-edit" 
                            onClick={(e) =>{
                                dispatch(refreshClient({ current:rowData, behavior:'update', form:{ ...form, disabled:false} }))
                                setComponent('drawer',{id:'drawer-client',open:true})                                                              
                            }}>
                            </span>                                
                        </a>
                        {/* Modal: see */}
                        <MyModal style={{}}
                        id={rowData.id}                        
                        config={{title:'DETALHES'}}
                        buttonOpen={{
                            title:<span className="mdi mdi-eye"></span>,
                        }}
                        buttonSubmit={{
                            title:<span className="mdi mdi-exit-to-app"></span>,
                        }}
                        customState={{
                            component: components.modal,
                            handleOpen:()=>{
                                setComponent('modal',{id:rowData.id, open:true})
                            },
                            handleClose:()=>setComponent('modal',{id:null, open:false})
                        }} >
                            <TableOneRow objData={rowData.salonClient}
                            config={{
                                uppercase: true, 
                                rootLabel: true,
                                char: '.',
                                ignore:[ '_id', ] 
                            }}
                            />
                        </MyModal>
                        {/* ConfirmModal : cm */}
                        <ConfirmModal id={"cmClientRemove"}
                        config = {{ title:'CANCELAR SERVIÇO', message:"Confirmar operação?" }}
                        buttonOpen={{
                            disabled:false,
                            title: <span className="mdi mdi-delete"></span> 
                        }}
                        buttonConfirm={{title:"",loading:form.saving}}
                        buttonCancel ={{titel:""}}
                        customState={{
                            component: components.modal,
                            handleOpen: ()=>{
                                dispatch(refreshClient({ current:rowData, behavior:'delete', form:{ ...form, disabled:false} }))
                                setComponent('modal',{id:"cmClientRemove", open:true})
                            },
                            handleConfirm:()=>{remove()},
                            handleCancel :()=>setComponent('modal',{id:null, open:false})
                        }}
                        style={{ buttonConfirm:{borderRadius:"11px"}, buttonCancel:{ } }}
                        />
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

const getBehavior = (behavior) =>{
    switch (behavior) {
        case 'delete':
            return {title:" Deletar"  , color:"var(--danger)"}
        case 'update':
            return {title:" Atualizar", color:"var(--warning)"} 
        default://create
            return {title:" Salvar"   , color:"var(--success)"}
    }
}


export default Client