// OBS: CRIAR UM FORM DINAMICO NO FUTURO!
// USANDO CLASS DO BOOTSTRAP:
import moment from 'moment'
import { Button, TagPicker, DatePicker } from 'rsuite'

import styles from './FormBuilder.module.css'
import Alert from '../../../components/Pieces/Alert'

// import { isPrimitive } from '../../../utils/validation'
// import { formInfo } from '../../../constants/pages/collaborator'

let focus = ""


const MyForm = (props) =>{
    const {
        alert={
            title: <span className="mdi mdi-alert">{" ATENÇÃO"}</span>,
            message: "Colaborador já cadastro!",
            style:{}
        },
        daysWeek=[],
        page={},
        services=[],
        collaborators=[], 
        form={},
        behavior={},
        buttonSubmit={},
        setPage=()=>{}, 
    } = props    
    const alertActived = alert.actived || (behavior==='create'&&page.name ? true:false)
    console.log("MyForm ### Schedule", buttonSubmit.color)

    return(
        <div className={styles.fbTemplate}>
            <Alert className={``} key={`${Math.random()}`} 
            actived={alertActived}
            config={alert}
            style={{}}
            />

            <b className={styles.fbTitle}>{"DADOS DO SERVIÇO"}</b>
            <div className={styles.fbGroup}>
                <div key={`${Math.random()}`} className={`${styles.fbItem} form-group d-flex flex-column`}>
                    <b>{"Dias da semana"}</b>
                    <TagPicker
                    name={"days-week"}
                    size={"lg"}
                    placeholder={"Dias da semana"}
                    data={daysWeek.map((label, value)=>({label, value}))}
                    disabled={form.disabled}
                    value={page.day}
                    autoFocus={focus==="days-week"}
                    onChange={(daysData)=>{
                        // focus="days-week"
                        setPage('day', daysData)
                    }}
                    />                    
                </div>
                <div key={`${Math.random()}`} className={`${styles.fbItem} form-group d-flex flex-column`}>
                    <b>{"Serviço(s)"}</b>
                    <TagPicker
                    name={"services"}
                    size={"lg"}
                    placeholder={"Serviços"}
                    data={services}
                    disabled={form.disabled}
                    value={page.services}
                    // autoFocus={focus==="services"}
                    onChange={(services)=>{
                        focus="services"
                        setPage('services', services)
                    }}
                    />
                </div>
                <div key={`${Math.random()}`} className={`${styles.fbItem} form-group d-flex flex-column`}>
                    <b>{"Colaborador(s)"}</b>
                    <TagPicker 
                    name={"collaborators"}
                    size={"lg"}
                    placeholder={"Colaborador(s)"}
                    data={collaborators}
                    disabled={form.disabled}
                    value={page.collaborators}
                    // autoFocus={focus==="collaborators"}
                    onChange={(collaborators)=>{
                        focus="collaborators"
                        setPage('collaborators', collaborators)
                    }}
                    />
                </div>
                <div key={`${Math.random()}`} className={`${styles.fbItem} form-group`}>
                    <b>{"Início"}</b>
                    <DatePicker
                    className={`form-control`}
                    name={"start"}
                    format={"HH:mm"}
                    hideMinutes={(min)=>![0,30].includes(min)}
                    disabled={form.disabled}
                    value={moment(page["start"]).toDate()}
                    autoFocus={focus==='start'}
                    onChange={(e)=>{
                        focus = "start"
                        setPage("start", e)
                    }}/>  
                </div>
                <div key={`${Math.random()}`} className={`${styles.fbItem} form-group`}>
                    <b>{"Fim"}</b>
                    <DatePicker
                    className={`form-control`}
                    name={"end"}
                    format={"HH:mm"}
                    hideMinutes={(min)=>![0,30].includes(min)}
                    disabled={form.disabled}
                    value={moment(page["end"]).toDate()}
                    autoFocus={focus==='end'}
                    onChange={(e)=>{
                        focus = "end"
                        setPage("end", e)
                    }}/>  
                </div>
                <div key={`${Math.random()}`} className={`${styles.fbItem} form-group`}>
                    <b>{"Data cadastro"}</b>
                    <input
                    className={`form-control`}
                    name={"date-registration"}
                    type={"date"}
                    placeholder={"Data cadastro"}
                    disabled={form.disabled}
                    value={moment(page["dateRegistration"]).format("YYYY-MM-DD")}
                    autoFocus={focus==='date-registration'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage("dateRegistration", e.target.value )
                    }}/>
                </div>         
            </div>

            <div className={styles.fbBtnGroup}>
                <Button className={styles.fbBtnSubmit}
                name    = {'btnSubmit'}
                disabled= {form.disabled}
                onFocus = {()=>{focus='btnSubmit'}} 
                // autoFocus={focus==='btnSubmit'}
                onClick = {buttonSubmit.onClick}
                loading = {buttonSubmit.loading || false}
                appearance={buttonSubmit.appearance||"primary"} 
                color={buttonSubmit.color} >
                    {buttonSubmit.title||"OK"}
                </Button>
            </div>
        </div>
    )  
}


export default MyForm