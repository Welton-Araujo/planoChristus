import { useEffect } from 'react'
import { 
    useDispatch, 
    useSelector,
} from 'react-redux'
import { Button } from 'rsuite'

// import useEffectDispatch from '../../hooks/UseEffect'
import { 
    // API
    allSchedule, 
    addSchedule,
    filterSchedule,
    updateSchedule,
    unlinkSchedule,
    allServicesSchedule,

    // STATE LOCAL
    refreshSchedule, 
    resetSchedule, 
} from '../../store/modules/schedule/actions'

import styles           from './Schedule.module.css'
import FormSchedule     from './FormSchedule'
import MyTable          from '../../components/Table'
// import TableOneRow      from '../../components/TableOneRow'
import MyDrawer         from '../../components/Drawer'
// import MyModal          from '../../components/Modal'
import ConfirmModal     from '../../components/Modal/ConfirmModal'

// STATIC TEST
import loginFake    from '../../data/fakeReq/login.json' 
import { 
    scheduleTable as tableConfig
} from '../../constants/components/table' 

const { name:salonName } = loginFake.salon
let stap = 0


const Schedule = (props)=>{
    const { style } = props
    // console.log('Schedule', ScheduleTable)
    
    //STATE: inicial=[] e atualizado=[...]
    const { all, current, services, form, components, behavior } = useSelector((state)=>state.schedule)
    console.log('SCHEDULE #### ', current, services, all)
        
    //FUNCOES:
    const dispatch     = useDispatch()
    const setComponent = (component, state) =>{
        dispatch(refreshSchedule({ components:{ ...components, [component]:state } }))
    }
    const setSchedule = (key, value) =>{
        dispatch(refreshSchedule({ current:{ ...current, [key]:value } }))
    }
    const save = () =>{
        dispatch(addSchedule())
    }
    const update = () =>{
        console.log('update...')
        dispatch(updateSchedule())
    }
    const remove = () =>{
        console.log('remove...')
        dispatch(unlinkSchedule())
    }
    // ATUALIZAR STATE NO LOAD DA PAGE: API
    const allLoad = load(all)
    // useEffectDispatch(allSchedule, null, load(all))
    // useEffectDispatch(allServicesSchedule, null, load(services))
    useEffect(() => {
        if(allLoad){ 
            dispatch(allSchedule())
            dispatch(allServicesSchedule()) 
        }
    },[dispatch, allLoad])

    return(
        <div className={`content ${styles.ScheduleContent}`}>  
            {/* SCHEDULE HEADER */}
            <div className={styles.scheduleHeader}>
                <div className={styles.scheduleTitle}>
                    <h1 className='pageTitle'>Horários</h1>
                    <small>{salonName}</small>
                </div>
                {/* Schedule Panel */}
                <div className={styles.schedulePanel}>
                    {/* Drawer */}
                    <MyDrawer className={styles.scheduleDrawer} style={{}}
                    id={'drawer-schedule'}
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
                            dispatch(refreshSchedule({ behavior:'create' }))
                            dispatch(resetSchedule())
                            setComponent('drawer',{id:'drawer-schedule', open:true})
                        },
                        handleClose:()=>setComponent('drawer',{id:null, open:false})
                    }} >
                        {/* Search */}
                        <div className={`${styles.scheduleSearch}`}>
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
                                    onChange={(e)=>setSchedule('email', e.target.value)}
                                    onKeyUp={(e)=>{
                                        if(e.key==="Enter"){
                                            dispatch(filterSchedule())
                                            // dispatch(resetSchedule())
                                        }
                                    }}
                                    />
                                    <div className="input-group-append ">
                                        <Button
                                        appearance="primary"
                                        loading={form.filtering}
                                        disabled={form.filtering}
                                        onClick={()=>{
                                            dispatch(filterSchedule())
                                            dispatch(resetSchedule())
                                        }} >
                                            <span className="mdi mdi-magnify"></span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Form */}
                        <FormSchedule                        
                        page={current}
                        services={services}
                        form={form}
                        behavior={behavior}
                        setPage={setSchedule}
                        buttonSubmit={{
                            title:  <span className="mdi mdi-zip-disk">{getBehavior(behavior).title} </span>,
                            loading: form.saving,
                            onClick: ()=>{ 
                                if(behavior==='create'){
                                    save() 
                                }else if(behavior==='update'){
                                    update()
                                }else{
                                    setComponent('modal',{id:"cmScheduleRemove", open:true}) 
                                } 
                            },
                            style: { backgroundColor: getBehavior(behavior).color }
                        }}
                        />
                    </MyDrawer>                        
                </div>
            </div>
            {/* SCHEDULE BODY */}
            <div className={styles.scheduleBody} style={style}>
                <MyTable 
                loading={form.filtering}
                data={all}
                config={tableConfig}
                onRowClick={(rowData)=>{
                    // dispatch(refreshSchedule({ current:rowData, behavior:'update', form:{ ...form, disabled:false} }))
                    // setComponent('drawer', {id:"drawer-schedule", open:true})
                }}
                actions={(rowData)=>{
                    return(
                        <>
                        {/* BUTTON: edit */}
                        <div className={styles.scheduleBtnEdit}>
                            <Button 
                            appearance="default"
                            loading={form.filtering}
                            disabled={form.filtering}
                            onClick={()=>{
                                dispatch(refreshSchedule({ current:rowData, behavior:'update', form:{ ...form, disabled:false} }))
                            setComponent('drawer',{id:'drawer-schedule',open:true})                                                              
                            }} > 
                                <span className="mdi mdi-account-edit"></span>
                            </Button>
                        </div>

                        {/* ConfirmModal: cm */}
                        <ConfirmModal id={"cmScheduleRemove"}
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
                                dispatch(refreshSchedule({ current:rowData, behavior:'delete', form:{ ...form, disabled:false} }))
                                setComponent('modal',{id:"cmScheduleRemove", open:true})
                            },
                            handleConfirm:()=>{remove()},
                            handleCancel :()=>setComponent('modal',{id:null, open:false})
                        }}
                        style={{ buttonConfirm:{borderRadius:"11px"}, buttonCancel:{ } }}
                        />

                        {/* Modal: see */}
                        {/* <MyModal style={{}}
                        id={rowData.id}                        
                        config={{title:'DETALHES SALÃO::COLABORADOR'}}
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
                            <TableOneRow objData={rowData.salonSchedule}
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


export default Schedule