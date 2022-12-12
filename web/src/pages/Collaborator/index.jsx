import { useEffect } from 'react'
import { 
    useDispatch, 
    useSelector,
} from 'react-redux'
import { Button } from 'rsuite'

// import useEffectDispatch from '../../hooks/UseEffect'
import { 
    // API
    allCollaborator, 
    addCollaborator,
    filterCollaborator,
    updateCollaborator,
    unlinkCollaborator,
    allServicesCollaborator,

    // STATE LOCAL
    refreshCollaborator, 
    resetCollaborator, 
} from '../../store/modules/collaborator/actions'

import styles           from './Collaborator.module.css'
import FormCollaborator from './FormCollaborator'
import MyTable          from '../../components/Table'
// import TableOneRow      from '../../components/TableOneRow'
import MyDrawer         from '../../components/Drawer'
// import MyModal          from '../../components/Modal'
import ConfirmModal     from '../../components/Modal/ConfirmModal'

// STATIC TEST
import loginFake    from '../../data/fakeReq/login.json' 
import bankInfo     from '../../data/componentTest/bankInfo.json'
import { 
    collaboratorTable as tableConfig
} from '../../constants/components/table' 

const { name:salonName } = loginFake.salon
let stap = 0


const Collaborator = (props)=>{
    const { style } = props
    // console.log('Collaborator', collaboratorTable)
    
    //STATE: inicial=[] e atualizado=[...]
    const { all, current, services, form, components, behavior } = useSelector((state)=>state.collaborator)
    console.log('COLLAB #### ', current, services, all)
        
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
    const allLoad = load(all)
    useEffect(() => {
        if(allLoad){ 
            dispatch(allCollaborator())
            dispatch(allServicesCollaborator()) 
        }
    },[dispatch, allLoad])

    return(
        <div className={`content ${styles.collaboratorContent}`}>  
            {/* COLLABORATOR HEADER */}
            <div className={styles.collaboratorHeader}>
                <div className={styles.collaboratorTitle}>
                    <h1 className='pageTitle'>Colaborador</h1>
                    <small>{salonName}</small>
                </div>
                {/* Collaborator Panel */}
                <div className={styles.collaboratorPanel}>
                    {/* Drawer */}
                    <MyDrawer className={styles.collaboratorDrawer} style={{}}
                    id={'drawer-collaborator'}
                    title={`${getCollabBehavior(behavior).title} colaborador`}
                    component={components.drawer}
                    placement={'left'}
                    buttonOpen={{
                        title: <span className="mdi mdi-account-plus"></span>,
                        handleOpen:()=>{
                            dispatch(refreshCollaborator({ behavior:'create' }))
                            dispatch(resetCollaborator())
                            setComponent('drawer',{id:'drawer-collaborator', open:true})
                        },
                    }}
                    buttonSubmit={{
                        disabled: false,
                        title:<span className="mdi mdi-exit-to-app"> Sair</span>,
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
                                            // dispatch(resetCollaborator())
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
                        banks={bankInfo}
                        services={services}
                        form={form}
                        behavior={behavior}
                        setPage={setCollaborator}
                        buttonSubmit={{
                            title:  <span className="mdi mdi-zip-disk">{getCollabBehavior(behavior).title} </span>,
                            loading: form.saving,
                            color: behavior==='create' ? "blue":"yellow",
                            onClick: ()=>{ 
                                if(behavior==='create'){
                                    save() 
                                }else if(behavior==='update'){
                                    update()
                                } 
                            },
                            style: { backgroundColor: getCollabBehavior(behavior).color }
                        }}
                        />
                    </MyDrawer>                        
                </div>
            </div>
            {/* COLLABORATOR BODY */}
            <div className={styles.collaboratorBody} style={style}>
                <MyTable 
                loading={form.filtering}
                data={all}
                config={tableConfig}
                onRowClick={(rowData)=>{ }}
                actions={(rowData)=>{
                    return(
                        <>
                        {/* BUTTON: edit */}
                        <div className={styles.collaboratorBtnEdit}>
                            <Button 
                            loading={form.filtering}
                            appearance={"ghost"}
                            color={"yellow"}
                            disabled={form.filtering}
                            onClick={()=>{
                                dispatch(refreshCollaborator({ current:rowData, behavior:'update', form:{ ...form, disabled:false} }))
                            setComponent('drawer',{id:'drawer-collaborator',open:true})                                                              
                            }} > 
                                <span className="mdi mdi-account-edit"></span>
                            </Button>
                        </div>

                        {/* ConfirmModal: cm */}
                        <ConfirmModal id={"cmCollaboratorRemove"}
                        config={{ title:'CANCELAR SERVIÇO', message:"Confirmar operação?" }}
                        component={components.modal}
                        buttonOpen={{
                            disabled:false,
                            title: <span className="mdi mdi-delete"></span>,
                            // appearance:"primary",
                            color:"red",
                            handleOpen: ()=>{
                                dispatch(refreshCollaborator({ current:rowData, behavior:'delete', form:{ ...form, disabled:false} }))
                                setComponent('modal',{id:"cmCollaboratorRemove", open:true})
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

const getCollabBehavior = (behavior) =>{
    switch (behavior) {
        case 'delete':
            return {title:" Deletar"   , color:"var(--danger)!important"}
        case 'update':
            return {title:" Atualizar" , color:"var(--warning)!important"} 
        default://create
            return {title:" Salvar"    , color:"var(--success)!important"}
    }
}


export default Collaborator