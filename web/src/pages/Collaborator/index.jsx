import { 
    useDispatch, 
    useSelector,
} from 'react-redux'
import { Button } from 'rsuite'

import useEffectDispatch from '../../hooks/UseEffect'
import { 
    // API
    allCollaborator, 
    addCollaborator,
    filterCollaborator,
    updateCollaborator,
    unlinkCollaborator,

    // STATE LOCAL
    refreshCollaborator, 
    resetCollaborator, 
} from '../../store/modules/collaborator/actions'

import styles           from './Collaborator.module.css'
import FormCollaborator from './FormCollaborator'
import MyTable          from '../../components/Table'
import TableOneRow      from '../../components/TableOneRow'
import MyDrawer         from '../../components/Drawer'
import MyModal          from '../../components/Modal'
import ConfirmModal     from '../../components/Modal/ConfirmModal'

// STATIC TEST
import loginFake   from '../../data/fakeReq/login.json' 
import collaboratorTable from '../../data/componentTest/collaboratorTable.json' 

const { name:salonName } = loginFake.salon
let stap = 0


const Client = (props)=>{
    const { style } = props
    // console.log('Client', collaboratorTable)
    
    //STATE: inicial=[] e atualizado=[...]
    const { all, current, form, components, behavior } = useSelector((state)=>state.collaborator)
    console.log('COLLAB #### ', current, all)
        
    //FUNCOES:
    const dispatch     = useDispatch()
    const setComponent = (component, state) =>{
        dispatch(refreshCollaborator({ components:{ ...components, [component]:state } }))
    }
    const setCollaborator = (key, value) =>{
        dispatch(refreshCollaborator({ current:{ ...current, [key]:value } }))
    }
    const save = () =>{
        dispatch(addCollaborator())
    }
    const update = () =>{
        console.log('update...')
        dispatch(updateCollaborator())
    }
    const remove = () =>{
        console.log('remove...')
        dispatch(unlinkCollaborator())
    }
    // ATUALIZAR STATE NO LOAD DA PAGE: API
    useEffectDispatch(allCollaborator, null, load(all))

    return(
        <div className={`content ${styles.collaboratorContent}`}>  
            {/* CLIENT HEADER */}
            <div className={styles.collaboratorHeader}>
                <div className={styles.collaboratorTitle}>
                    <h1>Colaborador</h1>
                    <small>{salonName}</small>
                </div>
                {/* Client Panel */}
                <div className={styles.collaboratorPanel}>
                    {/* Drawer */}
                    <MyDrawer className={styles.collaboratorDrawer} style={{}}
                    id={'drawer-collaborator'}
                    title={`${getBehavior(behavior).title} colaborador`}
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
                            dispatch(refreshCollaborator({ behavior:'create' }))
                            dispatch(resetCollaborator())
                            setComponent('drawer',{id:'drawer-collaborator', open:true})
                        },
                        handleClose:()=>setComponent('drawer',{id:null, open:false})
                    }} >
                        {/* Search */}
                        <div className={`${styles.collaboratorSearch}`}>
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
                                    onChange={(e)=>setCollaborator('email', e.target.value)}
                                    onKeyUp={(e)=>{
                                        if(e.key==="Enter"){
                                            dispatch(filterCollaborator())
                                            dispatch(resetCollaborator())
                                        }
                                    }}
                                    />
                                    <div className="input-group-append ">
                                        <Button
                                        appearance="primary"
                                        loading={form.filtering}
                                        disabled={form.filtering}
                                        onClick={()=>{
                                            dispatch(filterCollaborator())
                                            dispatch(resetCollaborator())
                                        }} >
                                            <span className="mdi mdi-magnify"></span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Form */}
                        <FormCollaborator                        
                        page={current}
                        form={form}
                        behavior={behavior}
                        setPage={setCollaborator}
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
            <div className={styles.collaboratorBody} style={style}>
                <MyTable 
                loading={form.filtering}
                data={all}
                config={collaboratorTable.config}
                onRowClick={(rowData)=>{
                    // dispatch(refreshCollaborator({ current:rowData, behavior:'update', form:{ ...form, disabled:false} }))
                    // setComponent('drawer', {id:"drawer-collaborator", open:true})
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
                                dispatch(refreshCollaborator({ current:rowData, behavior:'update', form:{ ...form, disabled:false} }))
                                setComponent('drawer',{id:'drawer-collaborator',open:true})                                                              
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
                                dispatch(refreshCollaborator({ current:rowData, behavior:'delete', form:{ ...form, disabled:false} }))
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
            return {title:" Deletar"   , color:"var(--danger)"}
        case 'update':
                return {title:" Atualizar" , color:"var(--warning)"} 
        default://create
            return {title:" Salvar"    , color:"var(--success)"}
    }
}


export default Client