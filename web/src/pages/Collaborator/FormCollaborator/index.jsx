// OBS: CRIAR UM FORM DINAMICO NO FUTURO!
// USANDO CLASS DO BOOTSTRAP:
import { Button } from 'rsuite'

import './Form.css'
import Alert from '../../../components/Pieces/Alert'

// import { isPrimitive } from '../../../utils/validation'
// import { formInfo } from '../../../constants/pages/collaborator'

let focus = ""
let seePasswd = false


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
    console.log("MyForm ### page", page)

    return(
        <div className={`formBuilder`}>
            <Alert className={``} key={`${Math.random()}`} 
            actived={alertActived}
            config={alert}
            style={{}}
            />

            <b className={`fbTitle`}>{"LOGIN"}</b>
            <div className={`fbGroup`}>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"Nome"}</b>
                    <input
                    className={`form-control`}
                    name={"name"}
                    type={"text"}
                    placeholder={"Nome do colaborador"}
                    disabled={form.disabled}
                    defaultValue={page['name']}
                    autoFocus={focus==='name'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage('name', e.target.value)
                    }}/>
                </div>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"Fone / WhatsApp"}</b>
                    <input
                    className={`form-control`}
                    name={"phone"}
                    type={"tel"}
                    placeholder={"Telefone"}
                    disabled={form.disabled}
                    value={page["phone"]}
                    autoFocus={focus==='phone'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage("phone", e.target.value)
                    }}/>                
                </div>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"Email"}</b>
                    <input
                    className={`form-control`}
                    name={"email"}
                    type={"email"}
                    placeholder={"name@email.com"}
                    disabled={form.disabled}
                    value={page["email"]}
                    autoFocus={focus==='email'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage("email", e.target.value)
                    }}/>                
                </div>            
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"Senha"}</b>
                    <input
                    className={`form-control`}
                    name={"passwd"}
                    type={seePasswd ? "text":"password"}
                    placeholder={"Senha"}
                    disabled={form.disabled}
                    value={page["passwd"]}
                    autoFocus={focus==='passwd'}
                    onDoubleClick={(e)=>{ seePasswd = !seePasswd }}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage("passwd", e.target.value)
                    }}/>
                </div>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"Foto"}</b>
                    <input
                    className={`form-control`}
                    name={"photo"}
                    type={"text"}
                    placeholder={"Link da foto"}
                    disabled={form.disabled}
                    value={page["photo"]}
                    autoFocus={focus==='photo'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage("photo", e.target.value)
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
                    </select>
                </div>
            </div>
            <b className={`fbTitle`}>{"DADOS"}</b>
            <div className={`fbGroup`}>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"Data de nasc."}</b>
                    <input
                    className={`form-control`}
                    name={"dateBirth"}
                    type={"date"}
                    placeholder={"Data de nascimento"}
                    disabled={form.disabled}
                    value={page["dateBirth"]}
                    autoFocus={focus==='dateBirth'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage("dateBirth", e.target.value)
                    }}/>                
                </div>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"Sexo"}</b>
                    <select
                    className="form-control"
                    name={"sex"}
                    disabled={form.disabled}
                    defaultValue={page["sex"]}
                    // autoFocus={focus==='sex'}
                    onChange={(e)=>{
                        focus="sex"
                        setPage("sex", e.target.value)
                    }}>
                        <option value={"a"}>{"Masculino"}</option>
                        <option value={"f"}>{"Feminino"}</option>
                    </select>
                </div>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"ID Recipient"}</b>
                    <input
                    className={`form-control`}
                    name={"recipientId"}
                    type={"text"}
                    placeholder={"ID Recipient"}
                    disabled={form.disabled}
                    value={page["recipientId"]}
                    autoFocus={focus==='recipientId'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage("recipientId", e.target.value)
                    }}/>                
                </div>
            </div>
            <b className={`fbTitle`}>{"Conta bancária"}</b>
            <div className={`fbGroup`}>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"Titular"}</b>
                    <input
                    className={`form-control`}
                    name={"bankAccount-owner"}
                    type={"text"}
                    placeholder={"Titular"}
                    disabled={form.disabled}
                    value={page["bankAccount"]["owner"]}
                    autoFocus={focus==='bankAccount-owner'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage("bankAccount", {...page.bankAccount, owner:e.target.value})
                    }}/>                
                </div>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"CPF/CNPJ"}</b>
                    <input
                    className={`form-control`}
                    name={"bankAccount-cpfCnpj"}
                    type={"text"}
                    placeholder={"CPF/CNPJ"}
                    disabled={form.disabled}
                    value={page["bankAccount"]["cpfCnpj"]}
                    autoFocus={focus==='bankAccount-cpfCnpj'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage("bankAccount", {...page.bankAccount, cpfCnpj:e.target.value})
                    }}/>                
                </div>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"Banco"}</b>
                    <input
                    className={`form-control`}
                    name={"bankAccount-bank"}
                    type={"text"}
                    placeholder={"Nº do banco"}
                    disabled={form.disabled}
                    value={page["bankAccount"]["bank"]}
                    autoFocus={focus==='bankAccount-bank'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage("bankAccount", {...page.bankAccount, bank:e.target.value})
                    }}/>                
                </div>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"Tipo de conta"}</b>
                    <select
                    className="form-control"
                    name={"bankAccount-type"}
                    disabled={form.disabled}
                    defaultValue={page["bankAccount"]["type"]}
                    // autoFocus={focus==='state'}
                    onChange={(e)=>{
                        focus="bankAccount-type"
                        setPage("bankAccount", { ...page.bankAccount, type:e.target.value})
                    }}>
                        <option value={"conta-conrrente"}>{"Conta corrente"}</option>
                        <option value={"conta-poupanca"}>{"Conta poupaça"}</option>
                    </select>
                </div>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"Agência"}</b>
                    <input
                    className={`form-control`}
                    name={"bankAccount-agency"}
                    type={"number"}
                    placeholder={"Nº da agência"}
                    disabled={form.disabled}
                    value={page["bankAccount"]["agency"]}
                    autoFocus={focus==='bankAccount-agency'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage("bankAccount", {...page.bankAccount, agency:e.target.value})
                    }}/>                
                </div>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"Número"}</b>
                    <input
                    className={`form-control`}
                    name={"bankAccount-number"}
                    type={"text"}
                    placeholder={"Nº da conta"}
                    disabled={form.disabled}
                    value={page["bankAccount"]["number"]}
                    autoFocus={focus==='bankAccount-number'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage("bankAccount", {...page.bankAccount, number:e.target.value})
                    }}/>                
                </div>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"Dígito"}</b>
                    <input
                    className={`form-control`}
                    name={"bankAccount-dv"}
                    type={"text"}
                    placeholder={"Dígito validador"}
                    disabled={form.disabled}
                    value={page["bankAccount"]["dv"]}
                    autoFocus={focus==='bankAccount-dv'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage("bankAccount", {...page.bankAccount, dv:e.target.value})
                    }}/>                
                </div>
            </div>
         
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