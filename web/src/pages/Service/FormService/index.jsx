// OBS: CRIAR UM FORM DINAMICO NO FUTURO!
// USANDO CLASS DO BOOTSTRAP:
import { Button, DatePicker, Uploader } from 'rsuite'
import moment from 'moment'

import './Form.css'
import Alert from '../../../components/Pieces/Alert'

// import { isPrimitive } from '../../../utils/validation'
// import { formInfo } from '../../../constants/pages/service'

let focus = ""


const MyForm = (props) =>{
    const {
        alert={
            title: <span className="mdi mdi-alert">{" ATENÇÃO"}</span>,
            message: "Colaborador já cadastro!",
            style:{}
        },
        page={},
        form={},
        behavior={},
        buttonSubmit={},
        setPage=()=>{}, 
    } = props    
    const alertActived = alert.actived || (behavior==='create'&&page.name ? true:false)
    const { files=[] } = page
    console.log("MyForm ### ", files)

    return(
        <div className={`formBuilder`}>
            <Alert className={``} key={`${Math.random()}`} 
            actived={alertActived}
            config={alert}
            style={{}}
            />            
            {/* SERVICO */}
            <b className={`fbTitle`}>{"DADOS DO SERVIÇO"}</b>
            <div className={`fbGroup`}>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"ID"}</b>
                    <input
                    className={`form-control`}
                    name={"id"}
                    type={"text"}
                    placeholder={"ID do service"}
                    disabled={true}
                    defaultValue={page['_id']}
                    autoFocus={focus==='id'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage('_id', e.target.value)
                    }}/>
                </div>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"Título"}</b>
                    <input
                    className={`form-control`}
                    name={"title"}
                    type={"text"}
                    placeholder={"Nome do service"}
                    disabled={form.disabled}
                    defaultValue={page['title']}
                    autoFocus={focus==='title'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage('title', e.target.value)
                    }}/>
                </div>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"Preço"}</b>
                    {/* DEU ERRO NO SERVIDOR: 33,33 CORRIGIR: 33.33  */}
                    <input
                    className={`form-control`}
                    name={"price"}
                    type={"text"}
                    placeholder={"Preço"}
                    disabled={form.disabled}
                    value={page["price"]}
                    autoFocus={focus==='price'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage("price", e.target.value)
                    }}/>                
                </div>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"Duração"}</b>
                    <DatePicker
                    className={`form-control`}
                    name={"duration"}
                    format={"HH:mm"}
                    hideMinutes={(min)=>![0,30].includes(min)}
                    disabled={form.disabled}
                    value={moment(page["duration"]).toDate()}
                    autoFocus={focus==='duration'}
                    onChange={(e)=>{
                        focus = "duration"
                        setPage("duration", e)
                    }}/>                
                </div>            
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"Comissão"}</b>
                    <input
                    className={`form-control`}
                    name={"commission"}
                    type={"text"}
                    placeholder={"Comissão"}
                    disabled={form.disabled}
                    value={page["commission"]}
                    autoFocus={focus==='commission'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage("commission", e.target.value)
                    }}/>
                </div>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"Recorrência"}</b>
                    <input
                    className={`form-control`}
                    name={"recurrence"}
                    type={"text"}
                    placeholder={"Recorrência"}
                    disabled={form.disabled}
                    value={page["recurrence"]}
                    autoFocus={focus==='recurrence'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage("recurrence", e.target.value)
                    }}/>
                </div>
                <div key={`${Math.random()}`} className={`fbItem form-group`} style={{width:"100%"}}>
                    <b>{"Descrição"}</b>
                    <textarea
                    rows={5}
                    className={`form-control`}
                    name={"description"}
                    type={"text"}
                    placeholder={"Descrição do serviço"}
                    disabled={form.disabled}
                    value={page["description"]}
                    autoFocus={focus==='description'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage("description", e.target.value)
                    }}/>
                </div>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"Status"}</b>
                    <select
                    className={"form-control"}
                    name={"status"}
                    disabled={form.disabled}
                    defaultValue={page["status"]}
                    autoFocus={focus==='status'}
                    onChange={(e)=>{
                        focus="status"
                        setPage("status", e.target.value)
                    }}>
                        <option value={"a"}>{"Ativo"}</option>
                        <option value={"i"}>{"Inativo"}</option>
                        <option value={"e"}>{"Excluído"}</option>
                    </select>
                </div>
            </div>
            {/* ARQUIVOS */}
            <b className={`fbTitle`}>{"ARQUIVOS"}</b>
            <div className={`fbGroup`}>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <Uploader
                    listType="picture-text"
                    defaultFileList={
                    files.map((file, i)=>{
                        console.log("DEFAULT", file)
                        return { 
                            ...file,
                            name: file.meta ? file.meta.name : file.name, 
                            fileKey:i+1, 
                            url:  file.meta ? file.url : null 
                        }
                    })}
                    action="//jsonplaceholder.typicode.com/posts/"
                    autoUpload={false}
                    multiple={true}
                    renderFileInfo={(file, fileElement) => {
                        // console.log("REDER ### ", file)
                        return  <div className={"fileInfo"}>
                                    <span>Nome: {file?.name}</span>
                                    <p>URL: {file?.url}</p>
                                </div>
                    }}
                    onChange={(files)=>{ setPage("files", files) }}
                    // onRemove={(files)=>{ setPage("files", files) }}
                    />                   
                </div>
            </div>            
            {/* BOTAO */}
            <div className={`fbBtnGroup`}>
                <Button className={`fbBtnSubmit`} style={buttonSubmit.style}
                name    = {'btnSubmit'}
                disabled= {form.disabled}
                onFocus = {()=>{focus='btnSubmit'}} 
                // autoFocus={focus==='btnSubmit'}
                onClick = {buttonSubmit.onClick}
                loading = {buttonSubmit.loading || false}
                appearance={buttonSubmit.appearance||"primary"} >
                    {buttonSubmit.title||"OK"}
                </Button>
            </div>
        </div>
    )  
}


export default MyForm