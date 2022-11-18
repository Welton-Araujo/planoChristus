/**
 * @VALIDATION
*/

export const primitiveVars = ['string','number','bigint'] 

export const isPrimitive =(data) => {
    const typeData   = typeof(data)
    const primitiveI = primitiveVars.indexOf(typeData)
    return (primitiveI===-1) ? false : true
}