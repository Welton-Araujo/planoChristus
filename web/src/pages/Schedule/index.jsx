import { useEffect } from 'react'
import { 
    useDispatch, 
    useSelector,
} from 'react-redux'
import { Button } from 'rsuite'
import moment from 'moment'

// import useEffectDispatch from '../../hooks/UseEffect'
import { 
    // API
    allSchedule, 
    addSchedule,
    updateSchedule,
    unlinkSchedule,
    allServicesSchedule,
    filterCollaboratorsSchedule,

    // STATE LOCAL
    refreshSchedule, 
    resetSchedule, 
} from '../../store/modules/schedule/actions'

// COMPONENTS:
import MyCalendar       from '../../components/Calendar'
import FormSchedule     from './FormSchedule'
// import MyTable          from '../../components/Table'
// import TableOneRow      from '../../components/TableOneRow'
import MyDrawer         from '../../components/Drawer'
// import MyModal          from '../../components/Modal'
// import ConfirmModal     from '../../components/Modal/ConfirmModal'

// CSS:
import styles           from './Schedule.module.css'

// STATIC TEST:
import loginFake        from '../../data/fakeReq/login.json'
import { 
    daysWeek, 
    daysWeekData 
} from '../../constants/pages/schedule' 
// import { 
//     scheduleTable as tableConfig 
// } from '../../constants/components/table' 

//DATA DE HOJE: (AO CARREGAR A PAGINA)
// const firstWeekday =  moment().weekday(0).format('YYYY-MM-DD')//"2022-11-09"
// const lastweekday  =  moment().weekday(6).format('YYYY-MM-DD')//"2022-12-29"
const { name:salonName } = loginFake.salon
let stap = 0


const Schedule = (props)=>{
    const { style } = props
    // console.log('Schedule', ScheduleTable)
    
    //STATE: inicial=[] e atualizado=[...]
    const { all, current, services, collaborators, form, components, behavior } = useSelector((state)=>state.schedule)
    console.log('SCHEDULE #### ', current, services, collaborators, all)
    const formattedEvents   = formatEvents(all)
        
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
    useEffect(() => {
        if(allLoad){ 
            dispatch(allSchedule())
            dispatch(allServicesSchedule()) 
        }
    },[dispatch, allLoad])

    // ATUALIZAR DEPOIS DO SERVICES:
    useEffect(()=>{
        dispatch(filterCollaboratorsSchedule())
    },[dispatch, current.services])

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
                    title={`${getBehavior(behavior).title} horário`}
                    placement={'left'}
                    buttonOpen={{
                        title: <span className="mdi mdi-calendar-plus"></span>,                        
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
                        {/* Form */}
                        <FormSchedule
                        daysWeek={daysWeek}
                        page={current}
                        services={services}
                        collaborators={collaborators}
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
                        buttonDelete={{
                            title:  <span className="mdi mdi-trash-can">{"Excluir"} </span>,
                            loading: form.saving,
                            onClick: ()=>{
                                remove()
                                setComponent('modal',{id:"cmScheduleRemove", open:true})                                  
                            },
                            style: { backgroundColor: 'var(--danger)' }
                        }}
                        />
                    </MyDrawer>                        
                </div>
            </div>
            {/* SCHEDULE BODY */}
            <div className={styles.scheduleBody} style={style}>
                <MyCalendar
                toolbar={false}
                // formats={}
                date={daysWeekData[moment().day()]}
                events={formattedEvents}
                defaultView={components?.calendar.view}
                // onRangeChange={ ({start, end})=>dispatch(filterCollaboratorsSchedule()) }
                onSelectEvent={(e)=>{
                    dispatch(refreshSchedule({behavior:"update"}))
                    dispatch(refreshSchedule({current:e.resource}))
                    setComponent('drawer',{id:'drawer-schedule', open:true})
                }}
                style={{padding:'5px'}}
                />
                {/* <MyTable 
                loading={form.filtering}
                data={all}
                config={tableConfig}
                onRowClick={(rowData)=>{}}
                actions={(rowData)=>{
                    return(
                        <>
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
                        </>
                    )
                }}/>  */}

            </div>
        </div>   
    )
}

const formatEvents = (schedules) =>(schedules.map((schedule)=>schedule.day.map((d)=>{
        const startHHmm = daysWeekData[d].setHours(
            parseInt(moment(schedule.start).format('HH')),// So HH
            parseInt(moment(schedule.start).format('mm')) // So mm
        )
        const endHHmm = daysWeekData[d].setHours(
            parseInt(moment(schedule.end).format('HH')), 
            parseInt(moment(schedule.end).format('mm')) 
        )
        
        return{
            resource: schedule,
            title:  `${schedule.services.length} serviço(s) - ${schedule.collaborators.length} colaborador(es)`,
            start:  new Date(startHHmm),
            end:    new Date(endHHmm),
        }
    })).flat()
)

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