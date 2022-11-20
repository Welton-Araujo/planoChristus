/**
 * @VALIDATION
*/

const primitiveVars = ['string','number','bigint'] 

/**
 * 
 * @param {*} data 
 * @returns 
 */
const isPrimitive = (data) => {
    const typeData   = typeof(data)
    const primitiveI = primitiveVars.indexOf(typeData)
    return (primitiveI===-1) ? false : true
}

/**
 * @Info Validar se é object. 
 *       OBS: Embora Array seja um object, aqui resposta será false.
 * @param {*} obj 
 * @returns 
 */
const isPureObject = (obj) => {
    return typeof(obj)==='object' && !Array.isArray(obj)
}


export {
    primitiveVars,
    isPrimitive,
    isPureObject
}