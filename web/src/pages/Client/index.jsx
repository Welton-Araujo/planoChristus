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
import MyDrawer    from '../../components/Drawer'
import MyTable     from '../../components/Table'
// import TableOneRow from '../../components/TableOneRow'
// import MyModal       from '../../components/Modal'
import ConfirmModal from '../../components/Modal/ConfirmModal'

// STATIC TEST
import loginFake       from '../../data/fakeReq/login.json' 
import { 
    clientTable as tableConfig
} from '../../constants/components/table' 

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
                    <h1 className='pageTitle'>Clientes</h1>
                    <small>{salonName}</small>
                </div>
                {/* Client Panel */}
                <div className={styles.clientPanel}>
                    {/* Drawer */}
                    <MyDrawer className={styles.clientDrawer} style={{}}
                    id={'drawer-client'}
                    title={`${getClientBehavior(behavior).title} cliente`}
                    component={components.drawer}
                    placement={'left'}
                    buttonOpen={{
                        title: <span className="mdi mdi-account-plus"></span>,
                        handleOpen:()=>{
                            dispatch(refreshClient({ behavior:'create' }))
                            dispatch(resetClient())
                            setComponent('drawer',{id:'drawer-client', open:true})
                        },                        
                    }}
                    buttonSubmit={{
                        disabled: false,
                        title:<span className="mdi mdi-exit-to-app"> Sair</span>,
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
                            title:  <span className="mdi mdi-zip-disk">{getClientBehavior(behavior).title} </span>,
                            loading: form.saving,
                            color: behavior==='create' ? "blue":"yellow",
                            onClick: ()=>{ 
                                if(behavior==='create'){
                                    save() 
                                }else if(behavior==='update'){
                                    update()
                                } 
                            },
                            style: { backgroundColor: getClientBehavior(behavior).color }
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
                config={tableConfig}
                onRowClick={(rowData)=>{
                    // dispatch(refreshClient({ current:rowData, behavior:'update', form:{ ...form, disabled:false} }))
                    // setComponent('drawer', {id:"drawer-client", open:true})
                }}
                actions={(rowData)=>{
                    return(
                        <>
                        {/* BUTTON: edit */}
                        <div className={styles.clientBtnEdit}>
                            <Button 
                            appearance={"ghost"}
                            color={"yellow"}
                            loading={form.filtering}
                            disabled={form.filtering}
                            onClick={()=>{
                                dispatch(refreshClient({ current:rowData, behavior:'update', form:{ ...form, disabled:false} }))
                                setComponent('drawer',{id:'drawer-client',open:true})   
                            }} >
                                <span className="mdi mdi-account-edit"></span>
                            </Button>
                        </div>
                                           
                        {/* ConfirmModal : cm */}
                        <ConfirmModal id={"cmClientRemove"}
                        config = {{ title:'CANCELAR SERVIÇO', message:"Confirmar operação?" }}
                        component={components.modal}
                        buttonOpen={{
                            disabled:false,
                            title: <span className="mdi mdi-delete"></span>,
                            // appearance:"primary",
                            color:"red",
                            handleOpen: ()=>{
                                dispatch(refreshClient({ current:rowData, behavior:'delete', form:{ ...form, disabled:false} }))
                                setComponent('modal',{id:"cmClientRemove", open:true})
                            },
                        }}
                        buttonConfirm={{
                            title:"",
                            loading:form.saving,
                            handleConfirm:()=>{remove()},
                        }}
                        buttonCancel ={{
                            titel:"",
                            handleCancel :()=>setComponent('modal',{id:null, open:false})
                        }}
                        style={{ 
                            cmModal:{backgroundColor:"#ff00001c", borderRadius:"5px", padding:"10px"}, 
                            myModal:{ backgroundColor:"#ff00001c"}
                        }}
                        />
                        
                        {/* Modal: see */}
                        {/* <MyModal style={{}}
                        id={rowData.id}                        
                        config={{title:'DETALHES'}}
                        component={components.modal}
                        buttonOpen={{
                            title:<span className="mdi mdi-eye"></span>,
                            appearance:"ghost",
                            color:"yellow",
                            handleOpen:()=>{setComponent('modal',{id:rowData.id, open:true})}
                        }}
                        buttonSubmit={{
                            title:<span className="mdi mdi-exit-to-app"></span>,
                            handleClose:()=>{setComponent('modal',{id:null, open:false})}
                        }} 
                        >
                            <TableOneRow objData={rowData.salonClient}
                            config={{
                                uppercase: true, 
                                rootLabel: true,
                                char: '.',
                                ignore:[ '_id', ] 
                            }}
                            />
                        </MyModal> */}
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

const getClientBehavior = (behavior) =>{
    switch (behavior) {
        case 'delete':
            return {title:" Deletar"   , color:"var(--danger)!important"}
        case 'update':
            return {title:" Atualizar" , color:"var(--warning)!important"} 
        default://create
            return {title:" Salvar"    , color:"var(--success)!important"}
    }
}


export default Client