// OBS: CRIAR UM FORM DINAMICO NO FUTURO!
// USANDO CLASS DO BOOTSTRAP:
import { Button } from 'rsuite'

import './Form.css'
import Alert from '../../../components/Pieces/Alert'

// import { isPrimitive } from '../../../utils/validation'
// import { formInfo } from '../../../constants/pages/client'

let focus = ""
let seePasswd = false


const MyForm = (props) =>{
    const {
        alert={
            title: <span className="mdi mdi-alert">{" ATENÇÃO"}</span>,
            message: "Cliente já cadastro!",
            style:{}
        },
        page={}, 
        form={},
        behavior={},
        buttonSubmit={},
        setPage=()=>{}, 
    } = props    
    const alertActived = alert.actived || (behavior==='create'&&page.name ? true:false)
    const { document={}, address={}, geo:{coordinates=[]} } = page
    // console.log("MyForm ### current", address)

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
                    placeholder={"Nome do cliente"}
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
                    <b>{"Tipo de documento"}</b>
                    <select
                    className="form-control"
                    name={"document-type"}
                    disabled={form.disabled}
                    defaultValue={document["type"]}
                    // autoFocus={focus==='status'}
                    onChange={(e)=>{
                        focus="document-type"
                        setPage("document", { ...page.document, type:e.target.value})
                    }}>
                        <option value={"cpf"}>{"CPF"}</option>
                        <option value={"cnpj"}>{"CNPJ"}</option>
                    </select>
                </div>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"Nº do documento"}</b>
                    <input
                    className={`form-control`}
                    name={"document-number"}
                    type={"text"}
                    placeholder={"Nº do documento"}
                    disabled={form.disabled}
                    value={document["number"]}
                    autoFocus={focus==='document-number'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage("document", { ...page.document, number:e.target.value})
                    }}/>                
                </div>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"ID Customer"}</b>
                    <input
                    className={`form-control`}
                    name={"customerId"}
                    type={"text"}
                    placeholder={"ID customer"}
                    disabled={form.disabled}
                    value={page["customerId"]}
                    autoFocus={focus==='customerId'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage("customerId", e.target.value)
                    }}/>                
                </div>
            </div>
            <b className={`fbTitle`}>{"ENDEREÇO"}</b>
            <div className={`fbGroup`}>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"Rua"}</b>
                    <input
                    className={`form-control`}
                    name={"street"}
                    type={"text"}
                    placeholder={"Logradouro"}
                    disabled={form.disabled}
                    value={address["street"]}
                    autoFocus={focus==='street'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage("address", {...page.address, street:e.target.value})
                    }}/>                
                </div>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"Número da casa"}</b>
                    <input
                    className={`form-control`}
                    name={"address-number"}
                    type={"text"}
                    placeholder={"Número da casa"}
                    disabled={form.disabled}
                    value={address["number"]}
                    autoFocus={focus==='address-number'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage("address", {...page.address, number:e.target.value})
                    }}/>                
                </div>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"Bairro"}</b>
                    <input
                    className={`form-control`}
                    name={"district"}
                    type={"text"}
                    placeholder={"Bairro"}
                    disabled={form.disabled}
                    value={address["district"]}
                    autoFocus={focus==='district'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage("address", {...page.address, district:e.target.value})
                    }}/>                
                </div>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"CEP"}</b>
                    <input
                    className={`form-control`}
                    name={"zipCode"}
                    type={"number"}
                    placeholder={"Ex. 10111222"}
                    disabled={form.disabled}
                    value={address["zipCode"]}
                    autoFocus={focus==='zipCode'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage("address", {...page.address, zipCode:e.target.value})
                    }}/>                
                </div>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"Cidade"}</b>
                    <input
                    className={`form-control`}
                    name={"city"}
                    type={"text"}
                    placeholder={"Cidade"}
                    disabled={form.disabled}
                    value={address["city"]}
                    autoFocus={focus==='city'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage("address", {...page.address, city:e.target.value})
                    }}/>                
                </div>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"UF"}</b>
                    <select
                    className="form-control"
                    name={"state"}
                    disabled={form.disabled}
                    defaultValue={address["state"]}
                    // autoFocus={focus==='state'}
                    onChange={(e)=>{
                        focus="state"
                        setPage("address", { ...page.address, state:e.target.value})
                    }}>
                        <option value={"ce"}>{"Ceará"}</option>
                        <option value={"rj"}>{"Rio de janeiro"}</option>
                        <option value={"sp"}>{"São Paulo"}</option>
                    </select>
                </div>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"País"}</b>
                    <select
                    className="form-control"
                    name={"country"}
                    disabled={form.disabled}
                    value={address["country"]}
                    // autoFocus={focus==='country'}
                    onChange={(e)=>{
                        focus="country"
                        setPage("address", {...page.address, country:e.target.value})
                    }}>
                        <option value={"br"}>{"Brasil"}</option>
                        <option value={"isr"}>{"Israel"}</option>
                        <option value={"usa"}>{"Estados Unidos"}</option>
                    </select>
                </div>
            </div>

            <b className={`fbTitle`}>{"Geo localização"}</b>
            <div className={`fbGroup`}>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"Latitude"}</b>
                    <input
                    className={`form-control`}
                    name={"coordinates0"}
                    type={"text"}
                    placeholder={"Lat: -3.731862"}
                    disabled={form.disabled}
                    value={coordinates[0] || "-3.731862"}
                    autoFocus={focus==='coordinates0'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage("geo", {
                            ...page['geo'], 
                            coordinates:[
                                parseFloat(e.target.value), 
                                page['geo']['coordinates'][1]
                            ]
                        })
                    }}/>                
                </div>
                <div key={`${Math.random()}`} className={`fbItem form-group`}>
                    <b>{"Longitude"}</b>
                    <input
                    className={`form-control`}
                    name={"coordinates1"}
                    type={"text"}
                    placeholder={"Long: -38.526669"}
                    disabled={form.disabled}
                    value={coordinates[1] || "-38.526669"}
                    autoFocus={focus==='coordinates1'}
                    onChange={(e)=>{
                        focus = e.target.name
                        setPage("geo", {
                            ...page['geo'], 
                            coordinates:[
                                page['geo']['coordinates'][0],
                                parseFloat(e.target.value)
                            ]
                        })
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