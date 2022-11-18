import './Form.css'
// USANDO CLASS DO BOOTSTRAP:
import { isPrimitive } from '../../../utils/validation'
import { formInfo } from '../../../constants/pages/client'


const MyForm = (props) =>{
    const { 
        page={}, 
        form={}, 
        setPage=()=>{}, 
    } = props
    // console.log("MyForm #####", fields)

    const fields = formInfo.map((component, i)=>{
        const fields = []
        if(component['field']==='input'     ){  fields.push(getInput(component,     form, page, setPage) )}
        if(component['field']==='inputMany' ){  fields.push(getInputMany(component, form, page, setPage) )}
        if(component['field']==='select'){ fields.push(getSelect(component, form, page, setPage) )}
        return fields
    })

    return(
        <div className={`formBuilder`}>
            {fields}
        </div>
    )  
}

const getInputMany = ({title, key, many}, form, page, setPage )=>{
    // console.log('GET INPUT_MANY ### ', title, key, many)
    const pageObj = page[key]
    return many.map((component)=> getInput(component, form, pageObj, setPage))
}

const getInput = ({title, type, placeholder, key}, form, page, setPage )=>{
    // console.log('GET INPUT ### ', title, key)
    const pageValue = page[key]
    return(
        <div key={`${key}-${Math.random()}`} className={`formBuilderItem form-group`}>
            <b>{title}</b>
            <input
            className={`form-control`}
            type={type}
            placeholder={placeholder}
            disabled={form.disabled}
            value={pageValue}
            onChange={(e)=>setPage(key, e.target.value)}
            />                
        </div>
    )    
}


const getSelect = ({title, key, options}, form, page, setPage) =>{
    const [defaultValue, optionResults] = getSelOptions({key, options}, page)
    // console.log('GET SELECT ### ', defaultValue)
    return(
        <div key={`${key}-${Math.random()}`} className={`formBuilderItem form-group`}>
            <b>{title}</b>
            <select
            className="form-control"
            disabled={form.disabled}
            defaultValue={defaultValue}
            onChange={(e)=>setPage(key, e.target.value)}
            >
                {optionResults}
            </select>
        </div>
    )     
}

const getSelOptions = ({ key, options=[] }, page) =>{
    let defaultValue = null

    const optionResults = options.map(({value, description}, i)=>{
        defaultValue = getSelDefaultValue(value, page[key])
        return( 
            <option 
            key={`${key}-${value}`} 
            value={value}>
                {description}
            </option>
        )
    })
    return [defaultValue, optionResults]
}

const getSelDefaultValue = (value, pageValue)=>{
    //STRING === pageValue(STRING)
    if(isPrimitive(pageValue)){ return  value===pageValue ? value : "" }
    
    //STRING === pageValue(OBJ)
    // if(typeof(pageValue)==='object'){
        for (const key in pageValue) {
            return value===pageValue[key] ? value : ""
        }
    // }
    return ""
}


export default MyForm