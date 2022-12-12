import { useEffect } from 'react'
import { 
    useDispatch, 
    useSelector,
} from 'react-redux'
import { Button } from 'rsuite'

// import useEffectDispatch from '../../hooks/UseEffect'
import { 
    // API
    allService, 
    addService,
    // filterService,
    updateService,
    unlinkService,

    // STATE LOCAL
    refreshService, 
    resetService, 
} from '../../store/modules/service/actions'

import styles           from './Service.module.css'
import FormService      from './FormService'
import MyTable          from '../../components/Table'
// import TableOneRow      from '../../components/TableOneRow'
import MyDrawer         from '../../components/Drawer'
// import MyModal          from '../../components/Modal'
import ConfirmModal     from '../../components/Modal/ConfirmModal'

// STATIC TEST
import loginFake        from '../../data/fakeReq/login.json' 
import { 
    serviceTable as tableConfig
} from '../../constants/components/table' 

const { name:salonName } = loginFake.salon
let stap = 0


const Service = (props)=>{
    const { style } = props
    // console.log('Service', serviceTable)
    
    //STATE: inicial=[] e atualizado=[...]
    const { all, current, form, components, behavior } = useSelector((state)=>state.service)
    console.log('SERVICE #### ', current, all)
        
    //FUNCOES:
    const dispatch     = useDispatch()
    const setComponent = (component, state) =>{
        dispatch(refreshService({ components:{ ...components, [component]:state } }))
    }
    const setService = (key, value) =>{
        dispatch(refreshService({ current:{ ...current, [key]:value } }))
    }
    const save = () =>{
        dispatch(addService())
    }
    const update = () =>{
        console.log('update...')
        dispatch(updateService())
    }
    const remove = () =>{
        console.log('remove...')
        dispatch(unlinkService())
    }
    // ATUALIZAR STATE NO LOAD DA PAGE: API
    const allLoad = load(all)
    useEffect(() => {
        if(allLoad){ 
            dispatch(allService())
        }
    },[dispatch, allLoad])

    return(
        <div className={`content ${styles.serviceContent}`}>  
            {/* SERVICE HEADER */}
            <div className={styles.serviceHeader}>
                <div className={styles.serviceTitle}>
                    <h1 className='pageTitle'>Serviços</h1>
                    <small>{salonName}</small>
                </div>
                {/* Service Panel */}
                <div className={styles.servicePanel}>
                    {/* Drawer */}
                    <MyDrawer className={styles.serviceDrawer} style={{}}
                    id={'drawer-service'}
                    title={`${getBehavior(behavior).title} serviço`}
                    placement={'left'}
                    buttonOpen={{
                        title: <span className="mdi mdi-plus-thick"></span>,                        
                    }}
                    buttonSubmit={{
                        disabled: false,
                        title:<span className="mdi mdi-exit-to-app"> Sair</span>,                        
                    }} 
                    customState={{
                        component: components.drawer,
                        handleOpen:()=>{
                            dispatch(refreshService({ behavior:'create', form:{ ...form, disabled:false } }))
                            dispatch(resetService())
                            setComponent('drawer',{id:'drawer-service', open:true})
                        },
                        handleClose:()=>setComponent('drawer',{id:null, open:false})
                    }} >
                        {/* Form */}
                        <FormService
                        page={current}
                        form={form}
                        behavior={behavior}
                        setPage={setService}
                        buttonSubmit={{
                            title:  <span className="mdi mdi-zip-disk">{getBehavior(behavior).title} </span>,
                            loading: form.saving,
                            onClick: ()=>{ 
                                if(behavior==='create'){
                                    save() 
                                }else if(behavior==='update'){
                                    update()
                                }else{
                                    alert("Função não implementada: behavior===delete")
                                } 
                            },
                            style: { backgroundColor: getBehavior(behavior).color }
                        }}
                        />
                    </MyDrawer>                        
                </div>
            </div>
            {/* SERVICE BODY */}
            <div className={styles.serviceBody} style={style}>
                <MyTable 
                loading={form.filtering}
                data={all}
                config={tableConfig}
                onRowClick={(rowData)=>{}}
                actions={(rowData)=>{
                    return(
                        <>
                        {/* BUTTON: edit */}
                        <div className={styles.serviceBtnEdit}>
                            <Button 
                            appearance="default"
                            loading={form.filtering}
                            disabled={form.filtering}
                            onClick={()=>{
                                dispatch(refreshService({ current:rowData, behavior:'update', form:{ ...form, disabled:false} }))
                                setComponent('drawer',{id:'drawer-service',open:true})
                            }} > 
                                <span className="mdi mdi-account-edit"></span>
                            </Button>
                        </div>

                        {/* ConfirmModal: cm */}
                        <ConfirmModal id={`cmServiceRemove-${rowData.id}`}
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
                                dispatch(refreshService({ current:rowData, behavior:'delete', form:{ ...form, disabled:false} }))
                                setComponent('modal',{id:`cmServiceRemove-${rowData.id}`, open:true})
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


export default Service